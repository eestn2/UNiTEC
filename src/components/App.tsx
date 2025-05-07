import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedBox from './feed/FeedBox';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FeedBox />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;