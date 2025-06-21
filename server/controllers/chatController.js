import mongoose from 'mongoose';
import Message from '../models/messageModel.js';

export const getMessages = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                {
                    sender: new mongoose.Types.ObjectId(senderId),
                    receiver: new mongoose.Types.ObjectId(receiverId),
                },
                {
                    sender: new mongoose.Types.ObjectId(receiverId),
                    receiver: new mongoose.Types.ObjectId(senderId),
                },
            ],
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;
        const message = await Message.create({ sender, receiver, content });
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};