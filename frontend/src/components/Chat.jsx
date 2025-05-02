// In your ChatComponent.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import { jwtDecode } from 'jwt-decode';

export default function Chat() {
  const { userId: receiverId } = useParams();
  const location = useLocation();
  const [basicInfo, setBasicInfo] = useState(location.state?.basicInfo || null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const socket = useSelector((state) => state.socket.socket); // Get socket from Redux store
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

    if (socket && currentUserId) {
      // The server-side code uses query parameters for userId on connection.
      // We should ensure the socket in Redux is initialized with this.
      // If it's not, you might need to adjust your Redux setup.
      // Assuming the socket in Redux is correctly initialized with the userId.

      // Instead of emitting 'join_chat', the server seems to handle user presence
      // based on the socket connection and disconnection events.
      // We don't need explicit 'join_chat' here based on the provided server code.

      socket.on('receive_message', (newMessage) => {
        console.log('Received message:', newMessage);
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

      // Cleanup socket listener on unmount
      return () => {
        if (socket) {
          socket.off('receive_message');
        }
      };
    }
  }, [location.state, receiverId, basicInfo?.name, token, currentUserId, currentUserName, socket]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && currentUserId && socket) {
      const messageData = {
        receiverId: receiverId,
        content: newMessage,
        senderId: currentUserId,
        senderName: currentUserName
      };

      setMessages(prevMessages => [...prevMessages, { sender: 'You', text: newMessage, _id: Date.now(), isSelf: true }]);
      setNewMessage('');

      socket.emit('send_message', messageData);

      try {
        console.log('call');
        const response = await fetch(`${apiUrl}/api/message/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newMessage, receiverId: receiverId }),
        });

        if (response.ok) {
          const sentMessage = await response.json();
          console.log(sentMessage);
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
        const response = await fetch(`${apiUrl}/api/message/get/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.conversation && data.conversation.message) {
            const formattedHistory = data.conversation.message.map(msg => ({
              sender: msg.senderId._id === currentUserId ? currentUserName : msg.senderId.name,
              text: msg.content,
              _id: msg._id,
              isSelf: msg.senderId._id === currentUserId
            }));
            setMessages(formattedHistory); // Instantly set the fetched history to the messages state
          }
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