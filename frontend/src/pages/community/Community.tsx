import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const CommunityChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: { name: "Aranya", profilePic: "https://i.pravatar.cc/100?img=12" },
      message: "Hey everyone! 🌱 Let’s make this project impactful!",
    },
    {
      sender: { name: "Riya", profilePic: "https://i.pravatar.cc/100?img=24" },
      message: "Absolutely! I’m excited to collaborate 🤝",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender: { name: "You", profilePic: "https://i.pravatar.cc/100?img=1" },
      message: newMessage,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex w-full h-[80vh]">
      <div className="flex flex-col w-full m-3 rounded-lg overflow-hidden border border-blue-600 shadow-lg">
        {/* Header */}
        <div className="bg-[#6EEB83]  text-white p-4 font-bold text-lg">
          🌍 Earth Stewards
        </div>

        <div className="flex flex-1 overflow-hidden ">
          {/* Members Sidebar */}
          <div className="w-1/4 border-r border-blue-600 p-4 overflow-y-auto bg-gray-50">
            <span className="text-lg font-semibold block mb-4">Members</span>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Aranya"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-800 text-sm">Aranya</span>
              </li>
              <li className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100?img=24"
                  alt="Riya"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-800 text-sm">Riya</span>
              </li>
              <li className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100?img=1"
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-800 text-sm">You</span>
              </li>
            </ul>
          </div>

          {/* Chat Area */}
          <div className="w-3/4 flex flex-col bg-gray-50">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((chat, index) => {
                const isMe = chat.sender.name === "You";
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
                        src={chat.sender.profilePic}
                        alt={chat.sender.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div
                        className={`p-3 rounded-lg shadow-md ${
                          isMe
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
                      >
                        <p className="text-sm font-semibold">
                          {chat.sender.name}
                        </p>
                        <p className="text-sm">{chat.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
