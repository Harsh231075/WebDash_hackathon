// src/components/profile/sections/Certificates.jsx
import React, { useState } from 'react';
import { FileText, Download, Eye, X, Trash2, Upload, Plus } from 'lucide-react';
import axios from 'axios';

const Certificates = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificates, setCertificates] = useState(data);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    section: "certificates",
    title: '',
    issuer: '',
    year: '',
    file: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormData({ ...formData, file });
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
        formDataToSend.append(key, formData[key]);
      });
      const token = localStorage.getItem("token");
      // Replace with your API endpoint

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/update`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });

      console.log(response);
      setIsModalOpen(false);
      // Add success notification
    } catch (error) {
      console.error('Error adding certificate:', error);
      // Add error notification
    }
  };

  const handleDelete = async (certId) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        // Replace with your API endpoint
        await axios.delete(`/api/certificates/${certId}`);
        setCertificates(certificates.filter(cert => cert.id !== certId));
        // Add success notification
      } catch (error) {
        console.error('Error deleting certificate:', error);
        // Add error notification
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold">Certificates</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert, index) => (
            <div key={index} className="border rounded-xl p-4 hover:border-blue-200 transition-colors">
              <div className="flex items-start gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{cert.title}</h3>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.year}</p>

                  <div className="flex gap-3 mt-3">
                    <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                    <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Certificate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add Certificate</h3>
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
                  Issuer
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.png"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {selectedFile.name}
                  </p>
                )}
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
                  Add Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;