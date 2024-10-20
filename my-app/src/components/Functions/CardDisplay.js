import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { motion } from 'framer-motion';
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
               <motion.div
                  className="cardContainer"
                  key={index}
                  whileHover={{ scale: 1.05 }}
               >
                  <Link className='cocktailText' to={nav + drink.strDrink} state={drink}>
                     <Card style={{ width: '18rem', height: '20rem' }}>
                        <Card.Body>
                           {props.fav && props.fav.includes(drink.idDrink) ? 
                           <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={true}></AddFavorite>
                           : 
                           <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={false}></AddFavorite>}
                           <Card.Text>
                              <img className='cocktailImage' src={drink.strDrinkThumb} alt="drink" />
                           </Card.Text>     
                           <Card.Text className='cocktailText'>{drink.strDrink}</Card.Text>     
                        </Card.Body>
                     </Card>
                  </Link>
               </motion.div>
            );      
         })}
      </div>
   </div>
  );
                
};

export default CardDisplay;