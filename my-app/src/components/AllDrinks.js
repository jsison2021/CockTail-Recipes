import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import CardDisplay from './Functions/CardDisplay';
import { useState, useEffect } from 'react';
import axios from "axios"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {  collection, getDocs  } from "firebase/firestore";
import {db} from './Functions/Firebase';


function AllDrinks(){

   let newObject = window.localStorage.getItem("currentUser");
   let currentUser = JSON.parse(newObject)
   let [data, setData] = useState(null)
   let [isFav, setIsFav] = useState(null)
   const [error, setError] = useState(null)
   let dataArray = []

   let gettingInfo = async (e) =>{
      

      if (currentUser){
         const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid , "/Favorites"));
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dataArray.push(doc.data().idDrink)
         });
         setIsFav(dataArray);
      }
   
      if (e === "" || e === undefined ){
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
         <div className='search-container'>
            <FontAwesomeIcon className='searchIcon' icon={faMagnifyingGlass} />
            <input
               className='searchBar'
               placeholder='Search for a cocktail...'
               onChange={(e) => gettingInfo(e.target.value)}
            />
         </div>

         {data && data.length > 0 && ( <>
            <CardDisplay data = {data} fav = {isFav}></CardDisplay>
         </>)}

         {error && <p></p>}


      </AnimatedPage>
   )
   
}

export default  AllDrinks;