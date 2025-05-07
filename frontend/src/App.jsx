import './App.css';
import Header from './components/Header.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Gifts from './pages/Gifts.jsx';
import Surprise from './pages/Surprise.jsx';
import Collection from './pages/Collection.jsx';
import About from './pages/About.jsx';
import Gallery from './pages/Gallery.jsx';
import Footer from './components/Footer.jsx';
import Description from './components/Description.jsx';
import Step01 from './components/Step01.jsx';
import Step02 from './components/Step02.jsx';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gifts' element={<Gifts />} />
          <Route path='/surprise' element={<Surprise />} />
          <Route path='/surprise/:occasion' element={<Description />} />
          <Route path='/surprise/:occasion/step01' element={<Step01 />} />
          <Route path='/surprise/:occasion/step02' element={<Step02 />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
