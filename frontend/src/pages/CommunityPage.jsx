import React from 'react';
import { PlusCircle } from 'lucide-react';

const CommunityPage = () => {
  const posts = [
    {
      author: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      content: 'Just landed a new position at Google! Thanks to all the alumni who helped me prepare for the interviews.',
      time: '2 hours ago',
      likes: 24,
      comments: 8
    },
    {
      author: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      content: 'Looking forward to speaking at next month\'s alumni tech panel! Who\'s joining?',
      time: '5 hours ago',
      likes: 15,
      comments: 12
    },
    {
      author: 'David Kim',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      content: 'Great catching up with fellow alumni at yesterday\'s networking event!',
      time: '1 day ago',
      likes: 32,
      comments: 5
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Feed</h1>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-gray-500 text-sm">{post.time}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <button className="hover:text-blue-600">
                  ❤️ {post.likes} likes
                </button>
                <button className="hover:text-blue-600">
                  💬 {post.comments} comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors">
        <PlusCircle size={24} />
      </button>
    </div>
  );
};

export default CommunityPage;