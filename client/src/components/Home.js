import React,{useEffect} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useNavigate
  } from "react-router-dom";
import MainContent from './MainContent';


const Home = () => {
    const navigate=useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('new');
        if (auth) {
            navigate('/Profile');
        }

    },[])

    return (

        <div>
        
        <MainContent/>

        </div>
    )

}
export default Home;
