import React from 'react';
import { useState, useEffect } from 'react';
import {  collection, getDocs  } from "firebase/firestore";
import {db} from './Firebase';
import CardDisplay from "./CardDisplay"

const GetDatabase = () => {

    let [data, setData] = useState(null)
    let newObject = window.localStorage.getItem("currentUser");
    let currentUser = JSON.parse(newObject)
    let [isFav, setIsFav] = useState(null)
    let dataArray = []
    let favArray = []

   const gettingList = async (e) => {
      if (currentUser){
         const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid , "/Favorites"));
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dataArray.push(doc.data())
            favArray.push(doc.data().idDrink)
         });
         setData(dataArray);
         setIsFav(favArray)
      }
   } 

   useEffect(() => {
      
      gettingList()
   }, [])
     
   return (
      <div className='gridContainer'>
         <div className='grid'>
            {data && data.length > 0 && ( <>
               <CardDisplay data = {data}  fav = {isFav} onClick = {gettingList}></CardDisplay>
            </>)}
            {!data && !currentUser && (<>
                  <p className='favText'>Sign in to add your favorite drinks!</p>
            </>)}

            {data && data.length  === 0 && currentUser && (<>
                  <p className='favText'>Start adding your favorite drinks!</p>
            </>)}
         </div>
      </div>
   );
 };
 


export default GetDatabase;