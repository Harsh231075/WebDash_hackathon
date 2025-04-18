import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';

const AchievementsPage = () => {
  const achievements = [
    {
      icon: Trophy,
      title: 'Top Contributor',
      description: 'Made 50+ valuable contributions to the alumni community',
      date: 'Earned March 2024',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Award,
      title: 'Mentor Champion',
      description: 'Mentored 10 fellow alumni in career development',
      date: 'Earned February 2024',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Star,
      title: 'Event Organizer',
      description: 'Successfully organized 3 alumni networking events',
      date: 'Earned January 2024',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-lg border p-6">
              <div className={`${achievement.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <achievement.icon className={`${achievement.color}`} size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
              <p className="text-gray-500 text-sm">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;