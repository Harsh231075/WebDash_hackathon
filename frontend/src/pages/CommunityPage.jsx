import React, { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import axios from 'axios';
import Post from '../components/Post';
import CommentSection from '../components/CommentSection'; // Import the new component

const CommunityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/post/get-post`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `${apiUrl}/api/post/like/${postId}`,
        {}, // You might not need a body for a like request
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchPosts(); // Refresh posts to update like count
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Feed</h1>
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-10">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No posts yet</div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="border-b last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={post.avatar}
                      alt={post.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{post.author}</p>
                      <p className="text-gray-500 text-sm">
                        {post.time}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-gray-700">{post.content}</p>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-500 mt-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="hover:text-blue-600"
                    >
                      ❤️ {post.likes || 0} likes
                    </button>
                    <button
                      className="hover:text-blue-600"
                      onClick={() => {
                        // You might want to manage comment visibility state here if you only want to show them on click
                        // For now, we'll always render the comment section
                      }}
                    >
                      💬 {post.comments?.length || 0} comments
                    </button>
                  </div>
                  <CommentSection postId={post.id} /> {/* Render the comment section */}
                </div>
              ))
            )}
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={24} />
        </button>
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50" onClick={() => setIsModalOpen(false)}>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div
              className="bg-white rounded-xl w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Create Post</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <Post
                  onClose={() => {
                    setIsModalOpen(false);
                    fetchPosts(); // Refresh posts after creating new one
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityPage;