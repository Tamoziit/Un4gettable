import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useSendMessage from "../../hooks/useSendMessage";
import Spinner from "../../components/Spinner";
import useGetCommunity from "../../hooks/useGetCommunity";

const CommunityChat = () => {
  const id = "68a92957d8aec1376211c5ce";
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();

  const { loading: loadingCommunity, getCommunity } = useGetCommunity();
  const { loading: sending, sendMessage } = useSendMessage();

  const [community, setCommunity] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");

  // Professional, illustrated human avatars (stable per user)
  const getAvatarUrl = (input?: { profilePic?: string; _id?: string; name?: string }) => {
    if (input?.profilePic) return input.profilePic;
    const seed = input?._id || input?.name || "un4gettable-user";
    // DiceBear notionists-neutral: clean, professional illustrated portraits
    return `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${encodeURIComponent(
      seed
    )}&backgroundType=gradientLinear&backgroundRotation=135&radius=50&shapeColor=2e3550,242038,223044&accessoriesProbability=15`;
  };

  // fetch community
  const fetchCommunity = async () => {
    const data = await getCommunity(id!);
    setCommunity(data);
  };

  useEffect(() => {
    fetchCommunity();
  }, [id]);

  // socket listener for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.emit("join-group", id);

    socket.on("newMessage", (newMessage) => {
      setCommunity((prev: any) => ({
        ...prev,
        chats: [...prev.chats, newMessage],
      }));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const data = await sendMessage({ id: id!, message: newMessage });

    if (data) {
      setCommunity((prev: any) => ({
        ...prev,
        chats: [...prev.chats, data],
      }));
    }
    setNewMessage("");
  };

  if (loadingCommunity || !community) return <Spinner />;

  return (
    <div className="flex w-full h-[100vh] bg-[#1B2432]">
      <div className="flex flex-col w-full m-3 rounded-lg overflow-hidden border border-[#2298b9] shadow-lg bg-[#1B2432]">
        {/* Header */}
        <div className="bg-[#2298b9] text-white p-4 font-bold text-lg">
          {community.tierId.tier || "Community Chat"}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Members Sidebar */}
          <div className="w-1/4 border-r border-[#2298b9] p-4 overflow-y-auto bg-[#242038]">
            <span className="text-lg font-semibold block mb-4 text-gray-100">Members</span>
            <ul className="space-y-3">
              {community.members.map((member: any) => {
                const avatar = getAvatarUrl(member?.memberId);
                return (
                  <li key={member._id} className="flex items-center gap-3">
                    <img
                      src={avatar}
                      alt={member.memberId?.name || "User"}
                      className="w-9 h-9 rounded-full object-cover bg-[#2e3550] ring-1 ring-[#2298b9]/30 shadow-sm"
                      loading="lazy"
                    />
                    <span className="text-gray-200 text-sm">{member.memberId?.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Chat Area */}
          <div className="w-3/4 flex flex-col bg-[#000000]">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {community.chats.length === 0 ? (
                <p className="text-gray-400 text-center">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                community.chats.map((chat: any, index: number) => {
                  const isMe = chat.sender?._id === authUser?._id;
                  const avatar = getAvatarUrl(chat.sender);
                  return (
                    <div
                      key={index}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-end gap-2 max-w-[70%] ${
                          isMe ? "flex-row-reverse" : ""
                        }`}
                      >
                        <img
                          src={avatar}
                          alt={chat.sender?.name || "User"}
                          className="w-9 h-9 rounded-full object-cover bg-[#2e3550] ring-1 ring-[#2298b9]/30 shadow-sm"
                          loading="lazy"
                        />
                        <div
                          className={`p-3 rounded-lg shadow-md ${
                            isMe ? "bg-[#2298b9] text-white" : "bg-[#2e3550] text-gray-100"
                          }`}
                        >
                          <p className="text-sm font-semibold">{chat.sender?.name}</p>
                          <p className="text-sm">{chat.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Box */}
            <div className="p-3 flex items-center gap-2 border-t border-[#2298b9] bg-[#1B2432]">
              <input
                type="text"
                className="flex-1 border border-[#2298b9]/40 bg-[#242038] text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2298b9]"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#2298b9] hover:bg-[#1f89a7] text-white px-4 py-2 rounded-md transition"
                disabled={sending}
              >
                {sending ? <Spinner size="small" /> : <FaPaperPlane />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;