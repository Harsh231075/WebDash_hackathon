import React, { useEffect } from 'react';
import WelcomeBanner from '../dashboard/WelcomeBanner';
import QuickStats from '../dashboard/QuickStats';
import UpcomingEvents from '../dashboard/UpcomingEvents';
import CommunityFeed from '../dashboard/CommunityFeed';
import { PlusCircle } from 'lucide-react';
import io from 'socket.io-client';
import { setSocket } from'../Redux/socketSlice';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'

const HomePage = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return () => console.log('No token found');

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // Assuming the id is stored in token payload

    if (!userId) return () => console.log('No user id found');
  
    const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
      query: {
        userId: userId,
      },
    });
    
    console.log('Socket connection established');
    dispatch(setSocket(newSocket));
    // return () => newSocket.disconnect();
  }, [dispatch]);

console.log("hi");


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