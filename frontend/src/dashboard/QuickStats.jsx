import React from 'react';
import { Users, MessageSquare, Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';

const QuickStats = () => {
  const selectedUser = useSelector((store) => store.selectedUser.selectedUser);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Total Connections */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Users size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Connections</p>
            <p className="text-2xl font-bold text-gray-900">{selectedUser?.profile?.followers.length || '0'}</p>
          </div>
        </div>
      </div>

      {/* Posts Made */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <MessageSquare size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Posts Made</p>
            <p className="text-2xl font-bold text-gray-900">{selectedUser?.postCount || '0'}</p>
          </div>
        </div>
      </div>

      {/* Events Attended */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-50 rounded-lg">
            <Calendar size={24} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Following</p>
            <p className="text-2xl font-bold text-gray-900">{selectedUser?.profile?.following.length || '0'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;