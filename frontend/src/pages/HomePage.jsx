import React from 'react';
import WelcomeBanner from '../dashboard/WelcomeBanner';
import QuickStats from '../dashboard/QuickStats';
import UpcomingEvents from '../dashboard/UpcomingEvents';
import CommunityFeed from '../dashboard/CommunityFeed';
import { PlusCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      <WelcomeBanner />
      <QuickStats />
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <UpcomingEvents />
        <CommunityFeed />
      </div>
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors">
        <PlusCircle size={24} />
      </button>
    </>
  );
};

export default HomePage;