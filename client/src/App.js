import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from "../src/components/NavBar";
import FetchNews from './components/FetchNews';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Forget from './components/Forget';
import Footer from './components/Footer';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';


function App() {

  return (

    <Router>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/FetchNews" element={<FetchNews />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound/>} />
        
        


      </Routes>
    
      <Footer/>


    </Router>
  );
}

export default App;
