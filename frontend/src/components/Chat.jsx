// In your ChatComponent.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

export default function Chat() {
  const { userId: receiverId } = useParams();
  const location = useLocation();
  const [basicInfo, setBasicInfo] = useState(location.state?.basicInfo || null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const socket = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.userId || decodedToken.id);
        setCurrentUserName(decodedToken.name || decodedToken.username || 'You');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);

  useEffect(() => {
    setBasicInfo(location.state?.basicInfo || null);
    fetchChatHistory();

    socket.current = io(import.meta.env.VITE_API_URL);

    if (currentUserId) {
      socket.current.emit('join_chat', currentUserId);
    }
    if (receiverId) {
      socket.current.emit('join_chat', receiverId);
    }

    socket.current.on('receive_message', (newMessage) => {
      if (newMessage.senderId !== currentUserId) {
        setMessages(prevMessages => [...prevMessages, {
          sender: newMessage.senderName,
          text: newMessage.content,
          _id: newMessage._id,
          isSelf: false
        }]);
      } else {
        console.log("Ignoring own broadcasted message:", newMessage);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [location.state, receiverId, basicInfo?.name, token, currentUserId, currentUserName]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && currentUserId) {
      const messageData = {
        receiverId: receiverId,
        content: newMessage,
        senderId: currentUserId,
        senderName: currentUserName
      };

      setMessages(prevMessages => [...prevMessages, { sender: 'You', text: newMessage, _id: Date.now(), isSelf: true }]);
      setNewMessage('');

      socket.current.emit('send_message', messageData);

      try {
        const response = await fetch(`${apiUrl}/api/chat/store-message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newMessage, receiver: receiverId }),
        });

        if (response.ok) {
          const sentMessage = await response.json();
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg._id === Date.now() ? { ...msg, _id: sentMessage._id } : msg
            )
          );
        } else {
          console.error('Failed to send message:', response.status);
          setMessages(prevMessages => prevMessages.filter(msg => !msg.isSelf || msg._id === Date.now()));
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => prevMessages.filter(msg => !msg.isSelf || msg._id === Date.now()));
      }
    }
  };

  const fetchChatHistory = async () => {
    if (token && currentUserId) {
      try {
        const response = await fetch(`${apiUrl}/api/chat/history/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const history = await response.json();
          const formattedHistory = history.map(msg => ({
            sender: msg.sender === currentUserId ? currentUserName : (basicInfo?.name || `User ${receiverId}`),
            text: msg.content,
            _id: msg._id,
            isSelf: msg.sender === currentUserId
          }));
          setMessages(formattedHistory);
        } else {
          console.error('Failed to fetch chat history:', response.status);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    }
  };
  console.log('Messages:', messages);
  console.log('Current User ID:', currentUserId);
  console.log('Receiver ID:', receiverId);
  console.log('Basic Info:', basicInfo);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-between">
      <div className="container max-w-xl mx-auto shadow-md rounded-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gray-200 py-4 px-6 border-b border-gray-300 flex items-center">
          {basicInfo?.avatar && (
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img src={basicInfo.avatar} alt={basicInfo?.name || `User ${receiverId}`} className="w-full h-full object-cover" />
            </div>
          )}
          <h2 className="text-lg font-semibold">{basicInfo?.name || `Chat with User ${receiverId}`}</h2>
        </div>

        {/* Message Area */}
        <div className="p-6 bg-white overflow-y-auto h-96">
          {messages.map((msg, index) => (
            <div key={msg._id || index} className={`mb-3 ${msg.isSelf ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block rounded-lg py-2 px-3 ${msg.isSelf ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              Start a conversation...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-gray-200 py-4 px-6 border-t border-gray-300 flex items-center">
          <input
            type="text"
            className="flex-grow bg-white rounded-full py-2 px-3 text-gray-700 focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white rounded-full py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}