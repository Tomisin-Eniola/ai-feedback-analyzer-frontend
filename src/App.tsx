import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/Home';
import FeedbackDetails from './components/routes/FeedbackDetails';
import Layout from './components/general/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/feedback/:id' element={<FeedbackDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
