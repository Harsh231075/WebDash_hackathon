import React from 'react';
import {useSelector} from 'react-redux'

const WelcomeBanner = () => {
  const selectedUser = useSelector((store)=>store.selectedUser.selectedUser);
  console.log(selectedUser || "kuch nahi ")
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex items-center space-x-4">
        <img
          src={selectedUser?.profile?.basic?.avatar}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {selectedUser?.profile?.basic?.name}</h1>
          <p className="text-gray-600">{selectedUser?.profile?.basic?.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;