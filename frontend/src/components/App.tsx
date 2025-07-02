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
import JobOfferFV from './offers/JobOfferFV';
import AdminIndex from './admin/AdminIndex';
import ProfileInfo from './user/ProfileInfo';

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

import { useEffect, useState } from 'react';
import PublishOffer from './offers/PublishOffer';
import SeeApplicants from './offers/SeeApplicants';

function App(): JSX.Element {
  // Axios configs
  axios.defaults.baseURL = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => {
    console.log("Sending request to PHP Server.");
    return config;
  });

  const [session, setSession] = useState<Record<string, unknown> | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session from server
    axios.get('/session/me.php')
      .then(res => {
        if (res.data.status === 'success' && res.data.data && res.data.data.user) {
          User.set(res.data.data.user);
          setSession(res.data.data.user);
        } else {
          setSession(null);
        }
      })
      .catch(() => setSession(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Tenemos que hacer una pantallita de carga...</div>;

  // Browser routings
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="app-content">
        <BrowserRouter basename="/">
          <Routes>
            <Route path='/' element={!session ? <Login /> : <FeedBox />} />
            <Route path='/test' element={<FeedBox />} />
            <Route path='/register-enterprise' element={<RegisterEnterprise />} />
            <Route path='/register-user' element={<RegisterUser />} />
            <Route path='/password-reset' element={<ForgotPassword />} />
            <Route path='/profile/:id' element={<ProfileInfo />} />
            {/*Add default admin-menu route to the approve users one. */}
            <Route path='/admin-menu/:panel' element={<AdminIndex />} />
            <Route path="/job-offer/:offerId" element={<JobOfferFV />} />
            <Route path="/job-offer/:offerId/:message/:type" element={<JobOfferFV />} />
            <Route path="/publish-offer" element={<PublishOffer />} />
            <Route path="/see-applicants" element={<SeeApplicants />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;