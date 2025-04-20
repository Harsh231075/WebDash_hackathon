// src/components/profile/sections/Achievements.jsx
import React, { useState } from 'react';
import { Trophy, Edit, X, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

const Achievements = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievements, setAchievements] = useState(data);
  const [formData, setFormData] = useState({
    section: "achievements",
    title: '',
    description: '',
    year: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    try {
      // Replace with your API endpoint
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/update`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response);
      setAchievements([...achievements, response.data]);
      setIsModalOpen(false);
      setFormData({ title: '', description: '', year: '' });
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        // Replace with your API endpoint
        await axios.delete(`/api/achievements/${id}`);
        setAchievements(achievements.filter(achievement => achievement.id !== id));
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold">Achievements</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-600">{achievement.description}</p>
                <p className="text-sm text-gray-500 mt-1">{achievement.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Achievement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add Achievement</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Achievements;