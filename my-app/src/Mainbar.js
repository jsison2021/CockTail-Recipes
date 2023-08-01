import './App.css';

import {
  Routes,
  Route,
  Link,
  NavLink, useLocation 
} from "react-router-dom";

import Home from './components/Home';
import Saved from './components/Saved';
import CockTail from './components/CockTail';
import AllDrinks from './components/AllDrinks';
import GooglePic from './Google.png';
import MenuAnimation from './components/Functions/MenuAnimation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faCircleUser,faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import { AnimatePresence } from "framer-motion";
import { useState } from 'react';

function Mainbar() {
  
  const [menu,setMenu] = useState(false)
  const [symbol,setSymbol] = useState(faBars)

  const [login, setLogin] = useState(false)
  const [arrow, setArrow] = useState(faAngleDown)
  
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

  let dropDown = () =>{
    if (login === true){
      setLogin(false)
      setArrow(faAngleDown)
    }
    if (login === false){
      setLogin(true)
      setArrow(faAngleUp)
    
    }
  }

  return (

    <div>
      <div className='regularNav'>
        <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")}  to = "/">Home</NavLink> 
        <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to = "/AllDrinks">All Drinks</NavLink> 
        <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to = "/Saved">Favorites</NavLink>
        
        <button className='userIcon' onClick={dropDown}>
          <FontAwesomeIcon icon={faCircleUser} /> 
          <FontAwesomeIcon className = "downArrow" icon={arrow} />
          {login && 
           <MenuAnimation >
            <div className = "dropDownMenu">
              <p className='loginStatus'>Not Logged in</p>
              <button className='loginButton'><img src={GooglePic} className= "googlePic" alt = "google"></img>Sign in with Google</button>
              </div>
            </MenuAnimation>
          }
        </button>
        
      </div>
      
      <div className='mobileNav'>

          
          <button className ="menuButton" onClick={menuChange}><p className='menuDesc'>Menu</p><FontAwesomeIcon icon={symbol} /></button>
          {menu?
          <div className='mobileMenu'>
            <button className='userIcon' onClick={dropDown}>
              <FontAwesomeIcon icon={faCircleUser} /> 
              <FontAwesomeIcon className = "downArrow" icon={arrow} />
              {login && 
                <div className='dropDownMenu'>
                  <p className='loginStatus'>Not Logged in</p>
                  <button className='loginButton'><img src={GooglePic} className= "googlePic" alt = "google"></img>Sign in with Google</button>
                </div>
              }
            </button>
             <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange} to = "/">Home</NavLink> 
             <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange} to = "/AllDrinks">All Drinks</NavLink> 
             <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange}  to = "/Saved">Favorites</NavLink> 
            
          </div> : <div></div>
          }
      </div>
     
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/AllDrinks" exact element={<AllDrinks/>}/>
          <Route path="/:id" exact element={<CockTail/>}/>
          <Route path="/Saved" exact element={<Saved/>}/>
        </Routes>
        </AnimatePresence>
      </div>


  );
}

export default Mainbar;
