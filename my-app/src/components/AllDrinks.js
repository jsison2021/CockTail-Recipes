import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import CardDisplay from './Functions/CardDisplay';
import { useState, useEffect } from 'react';
import axios from "axios"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function AllDrinks(){

   
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
   return(

      <AnimatedPage>       
         <p className='pageHeader'>Find your Drink</p>
         <FontAwesomeIcon className = "searchIcon" icon={faMagnifyingGlass} />
         <input className='searchBar'
               onChange={(e) => gettingInfo(e.target.value)}
               >
         </input>
         <div className='gridContainer'>
            <div className='grid'>
               {data && data.length > 0 && data.map(CardDisplay)}
            </div>
         </div>
         
      </AnimatedPage>
   )
   
}

export default  AllDrinks;