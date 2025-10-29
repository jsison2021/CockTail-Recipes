import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import AddFavorite from './AddFavorite';
import{useLocation} from 'react-router-dom';
import { useState } from 'react';

const CardDisplay = (props) => {


const [nav,setNav] = useState("")
const location = useLocation();

if (location.pathname === "/"){

}

if(!location.pathname === "/"){
   setNav(location.pathname + "/")
}

  return(
      <div className='gridContainer'>
      <div className='grid'>
         {props.data.map((drink, index) => {
            return (
               <div className="cardContainer" key={index}>
                  <Link to={nav + drink.strDrink} state={drink} className="card-link">
                     <div className='card-img-wrapper'>
                        <img className='cocktailImage' src={drink.strDrinkThumb} alt={drink.strDrink} />
                        <div className='card-overlay'>
                           <div className='overlay-buttons'>
                              {props.fav && props.fav.includes(drink.idDrink) ?
                                 <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={true}></AddFavorite>
                                 :
                                 <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={false}></AddFavorite>}
                              <div className='learn-more-btn'>
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='cocktailText'>{drink.strDrink}</div>
                  </Link>
               </div>
            );
         })}
      </div>
   </div>
  );

};

export default CardDisplay;