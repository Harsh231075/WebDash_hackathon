import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson</h1>
          <p className="text-gray-600">Class of 2020 | Computer Science</p>
          <p className="text-blue-600 mt-2">Software Engineer at Google</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
          <p className="text-gray-700">
            Passionate software engineer with expertise in full-stack development.
            Always eager to connect with fellow alumni and share experiences.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          <div className="space-y-2">
            <p className="text-gray-700">Email: sarah.johnson@email.com</p>
            <p className="text-gray-700">Location: San Francisco, CA</p>
            <p className="text-gray-700">LinkedIn: /in/sarahjohnson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;