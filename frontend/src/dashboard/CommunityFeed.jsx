import React from 'react';

const CommunityFeed = () => {
  const posts = [
    {
      author: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      content: 'Just landed a new position at Google! Thanks to all the alumni who helped me prepare for the interviews.',
      time: '2 hours ago',
    },
    {
      author: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      content: 'Looking forward to speaking at next month\'s alumni tech panel! Who\'s joining?',
      time: '5 hours ago',
    },
    {
      author: 'David Kim',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      content: 'Great catching up with fellow alumni at yesterday\'s networking event!',
      time: '1 day ago',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Community Feed</h2>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-gray-500 text-sm">{post.time}</p>
              </div>
            </div>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityFeed;