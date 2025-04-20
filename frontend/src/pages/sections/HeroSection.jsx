// src/components/profile/sections/HeroSection.jsx
import React, { useState } from 'react';
import { MapPin, Edit, X, Camera } from 'lucide-react';
import axios from 'axios';

const HeroSection = ({ data, coverPhoto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name,
    role: coverPhoto.role,
    quote: coverPhoto.quote,
    location: data.location || '',
    avatar: data.avatar,
    coverImage: coverPhoto.coverImage
  });

  const [coverFile, setCoverFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("section", "hero");

      if (coverFile) {
        formDataToSend.append("file", coverFile);
        formDataToSend.append("keyPath", "coverImage");
      }

      if (avatarFile) {
        formDataToSend.append("file", avatarFile);
        formDataToSend.append("keyPath", "avatar");
      }

      // formDataToSend.append("name", formData.name);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("quote", formData.quote);
      // formDataToSend.append("location", formData.location);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile/update`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        }
      );

      console.log("Updated:", response.data);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="absolute inset-0">
          <img
            src={formData.coverImage || 'https://i.pravatar.cc/1200'}
            alt="cover"
            className="w-full h-full object-cover mix-blend-overlay opacity-20"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30"
        >
          <Edit className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-40">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0 relative group">
                <img
                  src={formData.avatar || "https://i.pravatar.cc/300"}
                  alt={formData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover mx-auto md:mx-0"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setAvatarFile(file);
                        setFormData({ ...formData, avatar: URL.createObjectURL(file) });
                      }
                    }}
                    accept="image/*"
                  />
                  <Camera className="h-6 w-6 text-white" />
                </label>
              </div>

              <div className="flex-grow space-y-3 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{formData.name}</h1>
                <p className="text-lg md:text-xl text-gray-700">{formData.role}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{formData.location}</span>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl">{formData.quote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50" onClick={() => setIsModalOpen(false)}>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Update Hero Section</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div> */}

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Quote</label>
                  <textarea
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div> */}

                <div className="relative">
                  <img
                    src={formData.coverImage || 'https://i.pravatar.cc/1200'}
                    alt="cover"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg cursor-pointer hover:bg-black/60">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setCoverFile(file);
                          setFormData({ ...formData, coverImage: URL.createObjectURL(file) });
                        }
                      }}
                      accept="image/*"
                    />
                    <div className="text-white text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <span>Change Banner Photo</span>
                    </div>
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
