import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/latest`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">My Feed</h2>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
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
          ))
        ) : (
          <p className="text-gray-500">No posts to show.</p>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
