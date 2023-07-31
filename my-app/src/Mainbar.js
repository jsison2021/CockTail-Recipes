import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink, useLocation 
} from "react-router-dom";

import Home from './components/Home';
import Saved from './components/Saved';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'

import { AnimatePresence } from "framer-motion";
import { useState } from 'react';


function Mainbar() {
  
  const [menu,setMenu] = useState(false)
  const [symbol,setSymbol] = useState(faBars)

  const location = useLocation();
  let menuChange = () =>{
    if (menu === true){
      setMenu(false)
      setSymbol(faBars)
    }
    if (menu === false){
      setMenu(true)
      setSymbol(faX)
    }
  }

  return (

    <div>
      <div className='regularNav'>
        <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")}  to = "/">Home</NavLink> 
        <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to = "/Saved">Saved</NavLink> 
      </div>
            
      <div className='mobileNav'>

          
          <button className ="menuButton" onClick={menuChange}><p className='menuDesc'>Menu</p><FontAwesomeIcon icon={symbol} /></button>
          {menu?
          <div className='mobileMenu'>
             <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange} to = "/">Home</NavLink> 
             <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange}  to = "/Saved">Saved</NavLink> 
          </div> : <div></div>
          }
      </div>
     
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/Saved" exact element={<Saved/>}/>
        </Routes>
        </AnimatePresence>
      </div>


  );
}

export default Mainbar;
