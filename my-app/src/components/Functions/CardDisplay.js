import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { motion } from 'framer-motion';

import AddFavorite from "./AddFavorite"
const CardDisplay = (drink, index) => {
      return (
         <motion.div
            className= "cardContainer"
            key={index}
            whileHover={{ scale: 1.05 }}
         >
         <Link className='cocktailText' to = {"/" + drink.idDrink}>
            <Card style={{ width: '18rem',height: '20rem' }}>
            <Card.Body>
                  <AddFavorite strDrink = {drink.strDrink} idDrink = {drink.idDrink} strDrinkThumb = {drink.strDrinkThumb}></AddFavorite>
                  <Card.Text>
                     <img className = 'cocktailImage' src = {drink.strDrinkThumb}  alt = "drink"></img>
                  </Card.Text>     
                  <Card.Text className='cocktailText' >{drink.strDrink}</Card.Text>     
            </Card.Body>
            </Card>
         </Link>
         </motion.div>
      );
                
};

export default CardDisplay;