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

import MenuAnimation from './components/Functions/MenuAnimation';

import {auth} from './components/Functions/Firebase.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faCircleUser,faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';

function Mainbar() {
  let newObject = window.localStorage.getItem("currentUser");
  let currentUser = JSON.parse(newObject)
  console.log(currentUser);
  
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

  useEffect(() => {
    
 
  }, )
  return (

    <div>
      <div className='regularNav'>
        <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")}  to = "/">Home</NavLink> 
        <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to = "/AllDrinks">All Drinks</NavLink> 
        <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to = "/Saved">Favorites</NavLink>
        
        <button className='userIcon' onClick={dropDown}>
          {currentUser ? <img className='profilePic' src = {currentUser.photoURL} alt = "profile"></img> : <FontAwesomeIcon icon={faCircleUser} /> }
          <FontAwesomeIcon className = "downArrow" icon={arrow} />
          {login && 
           <MenuAnimation >
           
            </MenuAnimation>
          }
        </button>
        
      </div>
      
      <div className='mobileNav'>

          
          <button className ="menuButton" onClick={menuChange}><p className='menuDesc'>Menu</p><FontAwesomeIcon icon={symbol} /></button>
          {menu?
          <div className='mobileMenu'>
            <button className='userIcon' onClick={dropDown}>
            {auth.currentUser ? <img className='profilePic' src = {auth.currentUser.photoURL} alt = "profile"></img> : <FontAwesomeIcon icon={faCircleUser} /> }
              <FontAwesomeIcon className = "downArrow" icon={arrow} />
              {login && 
               <MenuAnimation >
           
               </MenuAnimation>
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
