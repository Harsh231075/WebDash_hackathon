import React from 'react';

const MessagesPage = () => {
  const messages = [
    {
      sender: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      message: 'Thanks for the interview tips!',
      time: '2 hours ago',
      unread: true
    },
    {
      sender: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      message: 'Looking forward to the tech panel next month',
      time: '1 day ago',
      unread: false
    },
    {
      sender: 'David Kim',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      message: 'Great meeting you at the networking event',
      time: '2 days ago',
      unread: false
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>
      <div className="divide-y">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-6 hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-blue-50' : ''
              }`}
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