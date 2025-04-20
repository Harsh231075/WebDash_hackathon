// src/components/profile/sections/PhotoGallery.jsx
import React, { useState } from 'react';
import { X, Plus, Upload, Trash2 } from 'lucide-react';
import axios from 'axios';


const PhotoGallery = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState(data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    caption: '',
    file: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, file });
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
    const token = localStorage.getItem("token");

    if (!formData.file) {
      alert("Please upload a photo before submitting.");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('caption', formData.caption);
      formDataToSend.append('file', formData.file);
      formDataToSend.append('section', "photos");

      console.log(formDataToSend);
      // Replace with your API endpoint
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile/update`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(response);
      setPhotos([...photos, response.data]);
      setIsModalOpen(false);
      setFormData({ caption: '', file: null });
      setSelectedImage(null);
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        const token = localStorage.getItem("token");
        // Replace with your API endpoint
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/profile/delete-photo/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        setPhotos(photos.filter(photo => photo.id !== id));
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold">Photo Gallery</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
                <p className="text-white text-sm">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add Photo</h3>
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
                  Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                  {selectedImage ? (
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="max-h-48 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setFormData({ ...formData, file: null });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a photo</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  name="caption"
                  value={formData.caption}
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
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
