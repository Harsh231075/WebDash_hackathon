import React from 'react';

const DirectoryPage = () => {
  const alumni = [
    {
      name: 'Michael Chen',
      graduation: '2020',
      major: 'Computer Science',
      company: 'Google',
      location: 'Mountain View, CA',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Emily Rodriguez',
      graduation: '2019',
      major: 'Business Administration',
      company: 'Microsoft',
      location: 'Seattle, WA',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      name: 'David Kim',
      graduation: '2021',
      major: 'Data Science',
      company: 'Amazon',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((person, index) => (
            <div key={index} className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{person.name}</h3>
                  <p className="text-gray-600 text-sm">Class of {person.graduation}</p>
                  <p className="text-gray-600 text-sm">{person.major}</p>
                  <p className="text-blue-600 text-sm">{person.company}</p>
                  <p className="text-gray-500 text-sm">{person.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;