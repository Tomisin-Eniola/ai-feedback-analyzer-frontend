import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/Home';
import FeedbackDetails from './components/routes/FeedbackDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/feedback/:id' element={<FeedbackDetails />} />
    </Routes>
  );
}

export default App;
