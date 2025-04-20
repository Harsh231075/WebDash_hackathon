// src/components/profile/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from './sections/HeroSection';
import BasicDetails from './sections/BasicDetails';
import EducationDetails from './sections/EducationDetails';
import ProfessionalDetails from './sections/ProfessionalDetails';
import Achievements from './sections/Achievements';
import Certificates from './sections/Certificates';
import PhotoGallery from './sections/PhotoGallery';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/api/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [apiUrl, token]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'professional', label: 'Professional' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const renderTabContent = () => {
    if (!profileData) {
      return null;
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {profileData.basic && <BasicDetails data={profileData.basic} />}
                {profileData.education && <EducationDetails data={profileData.education} />}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {profileData.professional && <ProfessionalDetails data={profileData.professional} />}
              {profileData.achievements && <Achievements data={profileData.achievements} />}
              {profileData.certificates && <Certificates data={profileData.certificates} />}
            </div>
          </div>
        );
      case 'professional':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {profileData.professional && <ProfessionalDetails data={profileData.professional} />}
              {profileData.education && <EducationDetails data={profileData.education} />}
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {profileData.achievements && <Achievements data={profileData.achievements} />}
              {profileData.certificates && <Certificates data={profileData.certificates} />}
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="space-y-8">
            {profileData.photos && <PhotoGallery data={profileData.photos} />}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading profile data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {profileData.hero && <HeroSection data={profileData.basic} coverPhoto={profileData.hero} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-1 rounded-xl bg-white p-2 shadow-lg mb-8 overflow-x-auto">
          <div className="flex sm:w-full gap-2 sm:gap-1 min-w-max sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap px-4 sm:px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm flex-1'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex-1'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="bg-transparent mb-16">
          <div className="animate-fadeIn">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;