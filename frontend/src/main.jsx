import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Signup from './auth/SignUp';
import Login from './auth/Login';
import Landing from './Home/Landing';
import { Provider } from 'react-redux'
import store  from './Redux/store.js'
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Landing />} />
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<App />} /> {/* All routes under '/' will be protected */}
      </Route>
    </Routes>
  </Router>
  </Provider>
);