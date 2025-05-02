import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("call",res.data);
        setMessages(res.data);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };

    fetchMessages();
  }, []);
  const handleClick = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>
      <div className="divide-y">
        {messages.map((message, index) => (
          <div
            key={index}
            onClick={() => handleClick(message._id)}
            className={`p-6 hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{message.sender}</h3>
                  <span className="text-sm text-gray-500">{message.time}</span>
                </div>
                <p className="text-gray-600 text-sm">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
