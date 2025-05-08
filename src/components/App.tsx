import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedBox from './feed/FeedBox';
import Login from './session/Login';
import RegisterEnterprise from './session/RegisterEnterprise';
import ForgotPassword from './session/ForgotPassword';
import RegisterUser from './session/RegisterUser';
import axios from 'axios';
import User from './session/User';

function App() {
  // Axios configs
  axios.interceptors.request.use((config) => {
    console.log("Sending request to PHP Server.");
    return config;
  });

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
    console.log("Session not found, sending to login.")
    session = undefined;
  }
  // Browser routings
  return (
    <BrowserRouter basename="/UNITEC">
      <Routes>
        <Route path='/' element={!session ? <Login /> : <FeedBox/>}/>
        <Route path='/test' element={<FeedBox />}/>
        <Route path='/register-enterprise' element={<RegisterEnterprise/>}/>
        <Route path='/register-user' element={<RegisterUser/>}/>
        <Route path='/password-reset' element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;