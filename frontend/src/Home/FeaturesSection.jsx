import React from 'react';
import { Users, Search, UserCircle, MessageSquare, Tag, Lock, Award, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Powerful Features for Alumni Connection
            </h2>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Our platform provides all the tools you need to stay connected, build your network, and engage with your alma mater community.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Core Features
          </h3>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {/* Feature 1: User Authentication */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 rounded-t-2xl">
                <UserCircle className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Secure Authentication
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Create your account with robust login/signup features, session security, and password management to keep your profile safe.
                </p>
              </div>
            </div>

            {/* Feature 2: Alumni Directory */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
                <Users className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Alumni Directory
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Browse through a comprehensive, searchable list of verified alumni profiles to find and connect with former classmates.
                </p>
              </div>
            </div>

            {/* Continue the same pattern for other features */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-t-2xl">
                <Search className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Advanced Search & Filter
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Find specific alumni using powerful search tools with filters for batch, branch, job title, location, and more.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-t-2xl">
                <UserCircle className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Detailed Profile Pages
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Create and customize your personal and professional profile to showcase your journey, achievements, and current work.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-t-2xl">
                <MessageSquare className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Community Feed
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Engage in discussions, share updates, post opportunities, and network with other alumni through our interactive forum.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-2xl">
                <Tag className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Sorting & Tagging
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Organize alumni by graduation year, profession, interests, and other criteria to find relevant connections quickly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Features */}
        <div className="py-16 px-4">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Premium Features
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Premium Feature 1: Private Messaging */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-8 w-8 text-indigo-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">Private Messaging</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Communicate directly with other alumni through our secure, private messaging system for one-on-one conversations and networking opportunities.
              </p>
            </div>

            {/* Premium Feature 2: Achievement Section */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-indigo-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">Achievement Showcase</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Highlight your career milestones, awards, recognitions, and significant contributions in your dedicated achievements section.
              </p>
            </div>

            {/* Premium Feature 3: LinkedIn Integration */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="h-8 w-8 text-indigo-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">LinkedIn Integration</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Sync your profile with LinkedIn to keep your information updated automatically and expand your professional network.
              </p>
            </div>
          </div>

          <div className="mt-20 text-center space-y-6">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all duration-300"
            >
              Join Our Alumni Network
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 underline-offset-2 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}