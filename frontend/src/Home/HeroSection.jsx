import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Briefcase, Calendar, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-45 translate-x-1/4 -translate-y-1/2 animate-pulse">
          <div className="w-96 h-96 border-4 rounded-full border-white"></div>
        </div>
        <div className="absolute right-0 bottom-0 transform -translate-x-1/4 translate-y-1/4 animate-pulse delay-150">
          <div className="w-64 h-64 border-4 rounded-full border-white"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left column - Enhanced Text Content */}
          <div className="md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left lg:flex lg:items-center">
            <div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <div className="h-px w-8 bg-yellow-400"></div>
                <span className="text-sm font-semibold tracking-wider uppercase">Welcome to Alumni Hub</span>
              </div>

              <h1 className="mt-6 text-4xl tracking-tight font-extrabold text-white sm:mt-8 sm:text-6xl lg:mt-8 xl:text-7xl">
                <span className="block">Connect With Your</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 pb-2">
                  Alumni Network
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-300 sm:text-xl leading-relaxed">
                Build meaningful relationships, find mentors, and explore career opportunities with graduates from your institution. Stay connected with your alma mater and fellow alumni through our dedicated platform.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-5">
                <Link
                  to="/signup"
                  className="group flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:shadow-xl hover:shadow-yellow-500/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Join Network
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-white border-2 border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Right column - Enhanced Feature Cards */}
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="grid grid-cols-2 gap-5">
                {/* Feature Cards with enhanced hover effects */}
                {[
                  {
                    icon: Users,
                    title: "Alumni Directory",
                    desc: "Connect with verified alumni across batches",
                    color: "yellow"
                  },
                  {
                    icon: Briefcase,
                    title: "Career Network",
                    desc: "Explore job opportunities & mentorship",
                    color: "blue"
                  },
                  {
                    icon: Calendar,
                    title: "Events & Reunions",
                    desc: "Stay updated with alumni gatherings",
                    color: "purple"
                  },
                  {
                    icon: BookOpen,
                    title: "Community Forum",
                    desc: "Engage in discussions & knowledge sharing",
                    color: "green"
                  }
                ].map((feature, index) => (
                  <div key={index} className="group bg-white/10 p-5 rounded-xl hover:bg-white/20 transition-all duration-300">
                    <div className={`p-3 rounded-full bg-${feature.color}-400/20 mb-4 w-fit group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}-300`} />
                    </div>
                    <h3 className="text-white font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-300">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-600/50 to-indigo-700/50 rounded-xl p-5 text-center backdrop-blur-sm">
                <p className="text-white text-lg font-medium">
                  Join <span className="font-bold text-yellow-300">2,500+</span> alumni
                  <span className="block mt-1 text-sm text-gray-300">who are already connected!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff" className="w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
}