import React from 'react';
import { Users, MessageSquare, Calendar } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    { icon: Users, label: 'Total Connections', value: '234' },
    { icon: MessageSquare, label: 'Posts Made', value: '45' },
    { icon: Calendar, label: 'Events Attended', value: '12' },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <stat.icon size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;