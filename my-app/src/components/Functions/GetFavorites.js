import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
 
import { motion } from 'framer-motion';
import {  collection, getDocs  } from "firebase/firestore";
import {db} from './Firebase';
import AddFavorite from "./AddFavorite"

const GetDatabase = () => {

    let [data, setData] = useState(null)
    let newObject = window.localStorage.getItem("currentUser");
    let currentUser = JSON.parse(newObject)
    let dataArray = []

   const gettingList = async (e) => {
      if (currentUser){
         const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid , "/Favorites"));
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dataArray.push(doc.data())
            console.log(doc.data());
         });
         setData(dataArray);
      }
   } 

   const test = () =>{
      console.log()
   }
   
     useEffect(() => {
       gettingList()
     }, [])
     
   return (
    <div>
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
                              <AddFavorite onClick = {gettingList} strDrink = {drink.strDrink} idDrink = {drink.idDrink} strDrinkThumb = {drink.strDrinkThumb}></AddFavorite>
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
       {!data && !currentUser && (<>
            <p>Sign in to add your favorite drinks!</p>
       </>)}


    </div>
   );
 };
 


export default GetDatabase;