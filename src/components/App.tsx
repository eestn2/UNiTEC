import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedBox from './feed/FeedBox';
/* import { useState } from 'react'; */
import Login from './session/Login';
import RegisterEnterprise from './session/RegisterEnterprise';
import ForgotPassword from './session/ForgotPassword';
import RegisterUser from './session/RegisterUser';
import axios from 'axios';

function App() {
  // Axios configs
  axios.interceptors.request.use((config) => {
    console.log("Sending request to PHP Server.");
    return config;
  });

/*   const [session, setSessionToken] = useState(null);
   */
  // Browser routings
  return (
    <BrowserRouter basename="/UNITEC">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/test' element={<FeedBox />}/>
        <Route path='/register-enterprise' element={<RegisterEnterprise/>}/>
        <Route path='/register-user' element={<RegisterUser/>}/>
        <Route path='/password-reset' element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;