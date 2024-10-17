import './App.css';

import {
  Routes,
  Route,
  Link,
  NavLink, useLocation 
} from "react-router-dom";

import Home from './components/Home';
import Favorites from './components/Favorites';
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
  console.log(newObject)
  let currentUser = JSON.parse(newObject)
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
        <div style={{ display: 'flex', gap: '15px' }}> 
          <p className ="navTitle">Cocktail Recipes</p>
          <NavLink as={Link} className={({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to="/">Home</NavLink>
          <NavLink as={Link} className={({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to="/AllDrinks">All Drinks</NavLink>
          <NavLink as={Link} className={({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} to="/Favorites">Favorites</NavLink>
        </div>
        
        <div>
          <button className='userIcon' onClick={dropDown}>
          {currentUser?.photoURL ? (<img className='profilePic' src={currentUser.photoURL} alt="profile" />) : (<FontAwesomeIcon icon={faCircleUser} />)}
            <FontAwesomeIcon className="downArrow" icon={arrow} />
            {login && <MenuAnimation></MenuAnimation>}
          </button>
        </div>
      </div>

      
      <div className='mobileNav'>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between'}}> 
          <p className ="navTitle">Cocktail Recipes</p>
          <div>
          <button className ="menuButton" onClick={menuChange}><p className='menuDesc'>Menu</p><FontAwesomeIcon icon={symbol} /></button>
          </div>
          </div>
          {menu?
          <div className='mobileMenu'>
            <button className='userIcon' onClick={dropDown}>
            {currentUser?.photoURL ? (<img className='profilePic' src={currentUser.photoURL} alt="profile" />) : (<FontAwesomeIcon icon={faCircleUser} />)}
              <FontAwesomeIcon className = "downArrow" icon={arrow} />
              {login && 
               <MenuAnimation >
           
               </MenuAnimation>
              }
            </button>
             <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange} to = "/">Home</NavLink> 
             <NavLink as = {Link} className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange} to = "/AllDrinks">All Drinks</NavLink> 
             <NavLink as = {Link}  className = {({ isActive }) => (isActive ? "barlinks-active" : "barlinks")} onClick={menuChange}  to = "/Favorites">Favorites</NavLink> 
            
          </div> : <div></div>
          }
      </div>
     
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/:id" exact element={<CockTail/>}/>
          <Route path="/AllDrinks" exact element={<AllDrinks/>}/>
          <Route path="/AllDrinks/:id" exact element={<CockTail/>}/>
          <Route path="/Favorites" exact element={<Favorites/>}/>
          <Route path="/Favorites/:id" exact element={<CockTail/>}/>
        </Routes>
        </AnimatePresence>
      </div>


  );
}

export default Mainbar;
