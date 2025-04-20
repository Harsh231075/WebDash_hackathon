
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Building, GraduationCap, MapPin, Briefcase, Mail, Phone } from 'lucide-react';

const DirectoryPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    company: '',
    graduationYear: '',
    location: ''
  });

  // Fetch alumni data
  useEffect(() => {
    const fetchAlumni = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile/basic-details`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.users);
        setAlumni(response.data.users);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  // Filter alumni based on search criteria
  const filteredAlumni = alumni.filter(person => {
    return (
      (!filters.company || person.company.toLowerCase().includes(filters.company.toLowerCase())) &&
      (!filters.graduationYear || person.graduation === filters.graduationYear) &&
      (!filters.location || person.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  return (
    <div className="space-y-8">
      {/* Enhanced Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Search Alumni</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <div className="relative group">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors" />
              <input
                type="text"
                className="pl-12 w-full h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="Search by company..."
                value={filters.company}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
            <div className="relative group">
              <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors" />
              <input
                type="text"
                className="pl-12 w-full h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="Enter graduation year..."
                value={filters.graduationYear}
                onChange={(e) => setFilters({ ...filters, graduationYear: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors" />
              <input
                type="text"
                className="pl-12 w-full h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="Search by location..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Alumni List */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Alumni Directory</h1>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlumni.map((person) => (
              <Link
                to={`/profile/view/${person.id}`}
                key={person._id}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={person.image || 'https://via.placeholder.com/150'}
                      alt={person.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50 group-hover:ring-blue-50"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      {person.graduation}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {person.name}
                  </h3>

                  <div className="mt-2 space-y-2">
                    <p className="flex items-center justify-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                      {person.company || 'Not specified'}
                    </p>
                    <p className="flex items-center justify-center text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                      {person.major || 'Not specified'}
                    </p>
                    <p className="flex items-center justify-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {person.location || 'Not specified'}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                    <button className="w-full bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 py-2 rounded-lg transition-colors text-sm font-medium">
                      View Profile
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No Results Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;