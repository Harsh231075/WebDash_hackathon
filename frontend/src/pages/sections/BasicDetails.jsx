// src/components/profile/sections/BasicDetails.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Edit, X, Camera, Upload } from 'lucide-react';
import axios from 'axios';

const BasicDetails = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    section: "basic",
    name: data.name,
    email: data.email,
    phone: data.phone,
    location: data.location,
    bio: data.bio,
    file: data.avatar,
    avatar: data.avatar
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormData({ ...formData, file: URL.createObjectURL(file) });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'file' && selectedImage) {
          formDataToSend.append('file', selectedImage);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      const token = localStorage.getItem("token");
      // Replace with your API endpoint
      const respone = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/update`, formDataToSend, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data", }
      });
      console.log(respone);
      setIsModalOpen(false);
      // Add success notification
    } catch (error) {
      console.error('Error updating profile:', error);
      // Add error notification
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold">Basic Details</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={data.avatar}
              alt={data.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <span className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 rounded-full ring-2 ring-white" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">{data.name}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="h-5 w-5" />
            <span>{data.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="h-5 w-5" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>{data.location}</span>
          </div>
        </div>

        <p className="mt-6 text-gray-600">{data.bio}</p>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={formData.avatar}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicDetails;