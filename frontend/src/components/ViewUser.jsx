import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, MessageSquare, Award, BookOpen } from 'lucide-react';

export default function ViewUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/profile/view-user/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, apiUrl]);

  const handleMessageClick = () => {
    if (userData?.basic) {
      // Navigate to the /chat route with the userId and the entire basic object as state
      navigate(`/chat/${userId}`, { state: { basicInfo: userData.basic } });
    } else {
      // Fallback if basic info is not available
      navigate(`/chat/${userId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">User not found</div>
      </div>
    );
  }

  const { hero, basic, education, professional, achievements, photos } = userData;

  return (
    <div className="bg-gray-100 min-h-screen pb-8">
      {/* Hero Section / Cover */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
        {hero.coverImage && (
          <img
            src={hero.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}

        {/* Profile Picture - Positioned to overflow into content below */}
        <div className="absolute -bottom-16 left-8">
          <div className="rounded-full h-32 w-32 border-4 border-white overflow-hidden">
            <img
              src={basic.avatar || "https://i.pravatar.cc/300"}
              alt={basic.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Header */}
        <div className="mt-20 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{basic.name}</h1>
            <p className="text-lg text-gray-700">{professional.role} at {professional.company}</p>
            <div className="flex items-center mt-1 text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>{basic.location}</span>
            </div>
          </div>

          {/* Message Button */}
          <button
            onClick={handleMessageClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
          >
            <MessageSquare size={18} className="mr-2" />
            Message
          </button>
        </div>

        {/* Main Content Area - Two Column Layout */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - About */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">{basic.bio}</p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen size={20} className="mr-2" />
                Education
              </h2>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{education.university}</p>
                <p className="text-gray-700">{education.course}, {education.stream}</p>
                <p className="text-gray-600">Class of {education.year} • CGPA: {education.cgpa}</p>
              </div>
            </div>

            {/* Achievements Section */}
            {achievements && achievements.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Award size={20} className="mr-2" />
                  Achievements
                </h2>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement._id} className="border-b pb-3 last:border-b-0 last:pb-0">
                      <h3 className="font-medium text-gray-900">{achievement.title} ({achievement.year})</h3>
                      <p className="text-gray-700">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos Grid */}
            {photos && photos.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((photo) => (
                    <div key={photo._id} className="aspect-square rounded-lg overflow-hidden">
                      {photo.url ? (
                        <img
                          src={photo.url}
                          alt={photo.caption || "Photo"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">{photo.caption || "No image"}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact & Skills */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Mail size={18} className="mr-3 text-gray-500" />
                  <span>{basic.email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone size={18} className="mr-3 text-gray-500" />
                  <span>{basic.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin size={18} className="mr-3 text-gray-500" />
                  <span>{basic.location}</span>
                </div>
                {professional.linkedin && (
                  <div className="flex items-center text-gray-700">
                    <Linkedin size={18} className="mr-3 text-gray-500" />
                    <a
                      href={`https://${professional.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {professional.linkedin}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Professional</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Company:</span> {professional.company}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {professional.role}
                </div>
                <div>
                  <span className="font-medium">Experience:</span> {professional.experience}
                </div>
              </div>
            </div>

            {/* Skills */}
            {professional.skills && professional.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {professional.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}