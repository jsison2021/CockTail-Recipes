import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import CardDisplay from './Functions/CardDisplay';
import { useState, useEffect } from 'react';
import axios from "axios"; 


function Home(){
   let [data1, setData1] = useState(null)
   let [data2, setData2] = useState(null)
   let [data3, setData3] = useState(null)

   const [error, setError] = useState(null)
  
   let gettingInfo = () =>{
      axios.all([
         axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001`), 
         axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11003`),
         axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`)
       ])
       .then(axios.spread((response1, response2, response3) => {
         setData1(response1.data.drinks)
         setData2(response2.data.drinks)
         setData3(response3.data.drinks)
       })
       )
       .catch(function (error) {
         // handle error
         if (error.response.status === 400) {
               console.log(error)
               setError('Cant find record')
         } else {
               setError('Unexpected Error')
         }
      });
       
   }

    useEffect(() => {
        gettingInfo()
    }, [])
   return(
      <AnimatedPage>
         <p className='pageHeader'>Top 3 Choices</p>
         <div className='gridContainer'>
            <div className='grid'>
               {data1 && data1.length > 0 && data1.map(CardDisplay)}
               {data2 && data2.length > 0 && data2.map(CardDisplay)}
               {data3 && data3.length > 0 && data3.map(CardDisplay)}
               {error && <p></p>}
            </div>
      </div>
      </AnimatedPage>
      
   )
   
}

export default  Home;