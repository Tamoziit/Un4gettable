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

  console.log(community)

  if (loadingCommunity || !community) return <Spinner />;

  return (
    <div className="flex w-full h-[100vh]">
      <div className="flex flex-col w-full m-3 rounded-lg overflow-hidden border border-blue-600 shadow-lg">
        {/* Header */}
        <div className="bg-[#6EEB83] text-white p-4 font-bold text-lg">
          {community.tierId.tier || "Community Chat"}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Members Sidebar */}
          <div className="w-1/4 border-r border-blue-600 p-4 overflow-y-auto bg-gray-50">
            <span className="text-lg font-semibold block mb-4">Members</span>
            <ul className="space-y-3">
              {community.members.map((member: any) => (
                <li key={member._id} className="flex items-center gap-3">
                  <span className="text-gray-800 text-sm">{member.memberId.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Area */}
          <div className="w-3/4 flex flex-col bg-gray-50">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {community.chats.length === 0 ? (
                <p className="text-gray-500 text-center">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                community.chats.map((chat: any, index: number) => {
                  const isMe = chat.sender?._id === authUser?._id;
                  return (
                    <div
                      key={index}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-end gap-2 max-w-[70%] ${isMe ? "flex-row-reverse" : ""
                          }`}
                      >
                        <img
                          src={chat.sender?.profilePic || "/Logo.png"}
                          alt={chat.sender?.name || "User"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div
                          className={`p-3 rounded-lg shadow-md ${isMe
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-800"
                            }`}
                        >
                          <p className="text-sm font-semibold">
                            {chat.sender?.name}
                          </p>
                          <p className="text-sm">{chat.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Box */}
            <div className="p-3 flex items-center gap-2 border-t border-blue-600 bg-white">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
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