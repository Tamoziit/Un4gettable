import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useSendMessage from "../../hooks/useSendMessage";
import Spinner from "../../components/Spinner";
import useGetCommunity from "../../hooks/useGetCommunity";
import AppNavbar from "../../components/navbars/AppNavbar";
import type { Chat, Community } from "../../types";
import MemberSideBar from "../../components/MemberSideBar";
import getAvatarUrl from "../../utils/getAvatarUrl";

const CommunityChat = () => {
	const id = "68a92957d8aec1376211c5ce";
	const { authUser } = useAuthContext();
	const { socket } = useSocketContext();
	const { loading: loadingCommunity, getCommunity } = useGetCommunity();
	const { loading: sending, sendMessage } = useSendMessage();
	const [community, setCommunity] = useState<Community | null>(null);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const fetchCommunity = async () => {
		const data = await getCommunity(id!);
		setCommunity(data);
	};

	useEffect(() => {
		fetchCommunity();
	}, [id]);

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

	const sendMessageHandler = async () => {
		if (!newMessage.trim()) return;

		const data = await sendMessage({ id: id!, message: newMessage });

		if (data) {
			setCommunity((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					chats: [...prev.chats, data],
				};
			});
		}
		setNewMessage("");
	};

	const handleSendMessage = async () => {
		await sendMessageHandler();
	};

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			await sendMessageHandler();
		}
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (community?.chats) {
			scrollToBottom();
		}
	}, [community?.chats]);

	if (loadingCommunity || !community) {
		return (
			<div className="flex items-center justify-center h-screen text-white p-6">
				<Spinner size="large" />
			</div>
		);
	}

	return (
		<>
			<AppNavbar />

			<div className="mx-auto w-full lg:w-[80%] px-6 md:px-10 pt-22 pb-6">
				<div className="mb-4 flex flex-col items-center justify-center w-full gap-2">
					<h1 className="text-3xl font-bold text-gray-200 text-center">
						Community Chat & Support
					</h1>
					<p className="text-gray-300 text-lg italic text-center">
						Connect with fellow users, share your experiences, and get real-time support on sustainability challenges.
					</p>
				</div>

				<div className="flex w-full h-[82vh]">
					<div className="flex flex-col w-full m-3 rounded-lg overflow-hidden border border-[#2298b9] shadow-lg bg-[#1B2432]">
						{/* Header */}
						<div className="bg-[#2298b9] text-white p-4 font-bold text-lg">
							{community.tierId.tier || "Community Chat"}
						</div>

						<div className="flex flex-1 overflow-hidden">
							{/* Members Sidebar */}
							<MemberSideBar
								members={community.members}
							/>

							{/* Chat Area */}
							<div className="w-3/4 flex flex-col  bg-[#0b1729]">
								<div className="flex-1 p-4 overflow-y-auto space-y-4">
									{community.chats.length === 0 ? (
										<p className="text-gray-400 text-center">
											No messages yet. Start the conversation!
										</p>
									) : (
										community.chats.map((chat: Chat, index: number) => {
											const isMe = chat.sender?._id === authUser?._id;
											const avatar = getAvatarUrl(chat.sender);
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
															src={avatar}
															alt={chat.sender?.name || "User"}
															className="w-9 h-9 rounded-full object-cover bg-[#2e3550] ring-1 ring-[#2298b9]/30 shadow-sm"
															loading="lazy"
														/>
														<div
															className={`p-3 rounded-lg shadow-md ${isMe ? "bg-[#2298b9] text-white" : "bg-[#2e3550] text-gray-100"
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
									<div ref={messagesEndRef} />
								</div>

								{/* Input Box */}
								<div className="p-3 flex items-center gap-2 border-t border-[#2298b9] bg-[#1B2432]">
									<input
										type="text"
										className="flex-1 border border-[#2298b9]/40 bg-[#242038] text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2298b9]"
										placeholder="Type a message..."
										value={newMessage}
										onKeyDown={handleKeyDown}
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
			</div>
		</>
	);
};

export default CommunityChat;