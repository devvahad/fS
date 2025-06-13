// ChatRoom.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from '../utils/axiosInstance';

const socket = io('http://localhost:3000'); // Update for production

const ChatRoom = ({ senderId, receiverId }) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.emit('join_room', getRoomId(senderId, receiverId));
        socket.on('receive_message', (data) => {
            setChat((prev) => [...prev, data]);
        });

        const fetchChat = async () => {
            const res = await axios.get(`/chat/${senderId}/${receiverId}`);
            setChat(res.data);
        };

        fetchChat();

        return () => socket.off('receive_message');
    }, [senderId, receiverId]);

    const getRoomId = (a, b) => [a, b].sort().join('_');

    const sendMessage = () => {
        const msgData = {
            room: getRoomId(senderId, receiverId),
            sender: senderId,
            receiver: receiverId,
            content: message,
            timestamp: new Date(),
        };
        socket.emit('send_message', msgData);
        setChat((prev) => [...prev, msgData]);
        setMessage('');
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">💬 Chat</h2>
            <div className="h-64 overflow-y-auto bg-gray-100 p-3 rounded mb-3">
                {chat.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${msg.sender === senderId ? 'text-right text-blue-600' : 'text-left text-gray-800'
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    className="border p-2 w-full rounded"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type message..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
