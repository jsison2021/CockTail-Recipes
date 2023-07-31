import React from 'react'
import AnimatedPage from './AnimatedPage';

import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios"; 

function Home(){
   let [data, setData] = useState(null)
   const [error, setError] = useState(null)

   let gettingInfo = () =>{
      
      axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
      .then(function (response) {
         // handle success
         console.log(response.data.drinks)
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
          <p>home</p>
          {data && data.length > 0 && (
             <>
            
               {data.map((drink) => {
                 return (
                   <div key={drink}>
                     <p>{drink.strDrink}</p>
                   </div>
                 );
               })}
             
           </>
          )}
        
      </AnimatedPage>
   )
   
}

export default  Home;