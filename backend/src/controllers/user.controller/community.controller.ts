import { Request, Response } from "express";
import Community from "../../models/community.model";
import User from "../../models/user.model";
import { getReceiverSocketId, io } from "../../socket/socket";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const id = req.params.id;
        const senderId = req.user?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await Community.findById(id);
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        // fetch sender details from User model
        const sender = await User.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender: senderId,
            senderModel: "User",
            message,
        };

        // push to chats
        community.chats.push(newMessage);
        await community.save();

        // notify all members except sender
        for (const member of community.members) {
            if (member.memberId.toString() === senderId.toString()) continue;

            const receiverSocketId = getReceiverSocketId(member.memberId.toString());
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", {
                    sender,
                    message,
                });
            }
        }

        res.status(200).json({
            sender,
            message,
        });
    } catch (error) {
        console.error("Error in User sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getCommunityDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const community = await Community.findById(id)
            .populate({
                path: "members.memberId",
                select: "_id name profilePic email",
            })
            .populate({
                path: "chats.sender",
                select: "_id name profilePic",
            })
            .populate({
                path: "tierId",
                select: "tier"
            });

        if (!community) {
            res.status(404).json({ error: "Community not found" });
            return;
        }

        res.status(200).json(community);
    } catch (error) {
        console.error("Error fetching community details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};