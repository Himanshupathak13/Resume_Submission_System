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
import PrivateComponent from './components/PrivateComponent';
import Upload from './components/Upload';


function App() {

  return (
    <div className='App'>
    <Router>

      <NavBar />

      <Routes>

        <Route element={<PrivateComponent/>}>
        
        <Route path="/FetchNews" element={<FetchNews />} />
        <Route path="/Profile" element={<Profile />} /> 
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/Upload" element={<Upload/>} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forget" element={<Forget />} />

        </Routes>
    
      </Router>
      <Footer/>

    </div>
  );
}

export default App;
