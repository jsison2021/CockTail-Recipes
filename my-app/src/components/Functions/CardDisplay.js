import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios"; 
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'

import AddFavorite from "./AddFavorite"
const CardDisplay = () => {

   let [data, setData] = useState(null)
   const [error, setError] = useState(null)

   let gettingInfo = (e) =>{
      if (e === " " || e === undefined ){
         e = "a";
      }
      axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + e)
      .then(function (response) {
         // handle success
         setData(response.data.drinks)
      })
      .catch(function (error) {
         // handle error
         if (error.response.status === 400) {
            console.log(error)
            setError('Cant find record')
         } else {
            setError('Unexpected Error')
         }
      })
      .then(function () {
         // always executed
      })
      
   }
    
    useEffect(() => {
      gettingInfo()
 
    }, [])
  return (
   <div>
      <FontAwesomeIcon className = "searchIcon" icon={faMagnifyingGlass} />
      <input className='searchBar'
            onChange={(e) => gettingInfo(e.target.value)}
      >
      </input>
      {data && data.length > 0 && (
            <>
            <div className='gridContainer'>
            <div className='grid'>
               {data.map((drink, index) => {
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
               })}
            </div>
         </div>
         </>
      )}
      {error && <p>Error with the data</p>}
   </div>
  );
};

export default CardDisplay;