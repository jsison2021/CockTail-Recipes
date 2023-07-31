import React from 'react'
import AnimatedPage from './AnimatedPage';

import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios"; 

function Home(){
   let [data, setData] = useState(null)
   const [error, setError] = useState(null)

   let gettingInfo = () =>{
      const top3 = ["11001","11003","11000"]

      for (let i = 0; 0 < top3.length; i++){
         console.log( top3[i])
         /*
         axios
         .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + top3[i])
         .then(function (response) {
            // handle success
            console.log(response.data)
      
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
         })*/
      }
    }
    
    useEffect(() => {
      gettingInfo()
    }, [])

   return(
      <AnimatedPage>
         <p>home</p>
        
      </AnimatedPage>
   )
   
}

export default  Home;