import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle } from 'lucide-react';
import TimeAgo from 'react-timeago';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/post/get-comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.comments);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await axios.post(
          `${apiUrl}/api/post/create-comment/${postId}`,
          { content: newComment },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setNewComment('');
        fetchComments();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  useEffect(() => {
    if (isExpanded) {
      fetchComments();
    }
  }, [isExpanded, postId]);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <MessageCircle size={20} />
        <span>{comments.length} Comments</span>
      </button>

      {isExpanded && (
        <div className="mt-4">
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white rounded-md py-2 px-4 text-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition-colors duration-200"
            >
              Post
            </button>
          </div>

          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((comment) => (
                <li key={comment._id} className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <img
                      src={comment.authorAvatar || "https://i.pravatar.cc/50?u=" + comment.author}
                      alt={`${comment.author}'s avatar`}
                      className="w-8 h-8 rounded-full"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://i.pravatar.cc/50"; }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{comment.user.name}</p>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        <TimeAgo date={comment.createdAt} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;