import { Route, Routes, } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import NotFoundPage from './pages/not-found/NotFoundPage';
import Layout from './components/Layout/Layout';
import SingleContact from './pages/singleContact/SingleContact';

import './L45App.css';

function L45App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/contact/:id' element={<SingleContact/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default L45App;
