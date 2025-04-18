import React from 'react';

const WelcomeBanner = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex items-center space-x-4">
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah Johnson!</h1>
          <p className="text-gray-600">Class of 2020 | Computer Science</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;