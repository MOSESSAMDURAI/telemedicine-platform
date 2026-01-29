'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from './ui/Input';
import Button from './ui/Button';

interface Message {
    _id: string;
    senderId: { _id: string; name: string };
    content: string;
    timestamp: string;
}

export default function ChatWindow({ consultationId }: { consultationId: string }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchMessages = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/messages/${consultationId}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const data = await res.json();
            setMessages(data);
            scrollToBottom();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Polling every 5s
        return () => clearInterval(interval);
    }, [consultationId]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            await fetch(`${apiUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({ consultationId, content: input })
            });
            setInput('');
            fetchMessages();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col h-[600px] border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="bg-blue-50 p-4 border-b border-blue-100">
                <h3 className="font-bold text-blue-900">Secure Consultation Chat</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.map((msg) => {
                    const isMe = msg.senderId._id === user?._id;
                    return (
                        <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 ${isMe ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                                }`}>
                                {!isMe && <p className="text-xs font-bold mb-1 opacity-70">{msg.senderId.name}</p>}
                                <p>{msg.content}</p>
                                <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-gray-50 border-t border-gray-200 flex gap-2">
                <Input
                    className="flex-1"
                    placeholder="Type a secure message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">Send</Button>
            </form>
        </div>
    );
}
