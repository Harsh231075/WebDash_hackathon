import React from 'react';

const UpcomingEvents = () => {
  const events = [
    {
      title: 'Annual Alumni Meetup 2025',
      date: 'March 15, 2025',
      location: 'University Campus',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    },
    {
      title: 'Tech Industry Networking',
      date: 'March 20, 2025',
      location: 'Virtual Event',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex space-x-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{event.title}</h3>
              <p className="text-gray-600 text-sm">{event.date}</p>
              <p className="text-gray-600 text-sm">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;