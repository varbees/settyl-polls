import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
        {/* Footer here */}
      </div>
    </Router>
  );
}

export default App;
