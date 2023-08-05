import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Footer from './components/layout/Footer';
import About from './pages/About';
import Poll from './pages/Poll';
import NotFound from './pages/NotFound';
import { PollProvider } from './contexts/PollContext';

function App() {
  return (
    <PollProvider>
      <Router>
        <div className='flex flex-col justify-center items-center'>
          <Navbar />
          <main className='container mx-auto px-3 pb-12 h-screen'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/polls' element={<Home />} />
              <Route path='/polls/:id' element={<Poll />} />
              <Route path='/about' element={<About />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PollProvider>
  );
}

export default App;
