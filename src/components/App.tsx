/**
 * @file App.tsx
 * @description The main entry point of the application, responsible for routing and session management.
 * It initializes the app, sets up Axios interceptors, and defines the routes for the application.
 * @date May 11, 2025
 * 
 * @Author: Haziel Magallanes
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedBox from './feed/FeedBox';
import Login from './session/Login';
import RegisterEnterprise from './session/RegisterEnterprise';
import ForgotPassword from './session/ForgotPassword';
import RegisterUser from './session/RegisterUser';
import axios from 'axios';
import User from './session/User';
import Footer from './UI/unitec/Footer';
import { JSX } from 'react';
import AdminPanel from './admin/AdminPanel';
import JobOfferFV from './offers/JobOfferFV';

/**
 * The main application component that handles routing and session management.
 * 
 * - Sets up Axios interceptors to log outgoing requests.
 * - Reads the session cookie to determine if a user is logged in.
 * - Routes users to the appropriate pages based on their session status.
 * 
 * @returns {JSX.Element} - The main application component with routing.
 * 
 * @example
 * <App />
 * 
 * @Author: Haziel Magallanes
 */
function App(): JSX.Element {
  // Axios configs
  axios.defaults.baseURL = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.interceptors.request.use((config) => {
    console.log("Sending request to PHP Server.");
    return config;
  });

  // Retrieve session from cookies
  let session: string | undefined = document.cookie
    .split('; ')
    .find(row => row.startsWith('session='))
    ?.split('=')[1];

  if (session) {
    try {
      const parsedValue = JSON.parse(decodeURIComponent(session));
      User.set(parsedValue);
      session = parsedValue;
    } catch (error) {
      console.error(error);
      session = undefined;
    }
  } else {
    console.log("Session not found, sending to login.");
    session = undefined;
  }

  // Browser routings
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="app-content">
        <BrowserRouter basename="/UNiTEC">
          <Routes>
            <Route path='/' element={!session ? <Login /> : <FeedBox />} />
            <Route path='/test' element={<FeedBox />} />
            <Route path='/register-enterprise' element={<RegisterEnterprise />} />
            <Route path='/register-user' element={<RegisterUser />} />
            <Route path='/password-reset' element={<ForgotPassword />} />
            <Route path='/admin-menu' element={<AdminPanel />} />
            <Route path="/job-offer/:offerId" element={<JobOfferFV />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;