import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedBox from './feed/FeedBox';
import { useState } from 'react';
import Login from './session/Login';
import RegisterEnterprise from './session/RegisterEnterprise';
import ForgotPassword from './session/ForgotPassword';
import RegisterUser from './session/RegisterUser';

function App() {
  const [session, setSessionToken] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={session? <FeedBox /> : <Login />}/>
        <Route path='/test' element={<FeedBox />}/>
        <Route path='/register-enterprise' element={<RegisterEnterprise/>}/>
        <Route path='/register-user' element={<RegisterUser/>}/>
        <Route path='/password-reset' element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;