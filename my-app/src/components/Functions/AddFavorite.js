import React, { useState } from 'react';
import { collection, setDoc, addDoc, getDocs, deleteDoc, doc  } from "firebase/firestore";
import {db, auth} from './Firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const AddDatabase = (props) => {
    let newObject = window.localStorage.getItem("currentUser");
    let currentUser = JSON.parse(newObject)

    const addFav = async (e) => {
        e.preventDefault();  
        let dataArray = []
        
        const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid , "/Favorites"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          dataArray.push(doc.data().idDrink)
        });
        
        if (dataArray.includes(props.idDrink) == true){
            console.log("duplicate")
            await deleteDoc(doc(db, "Users", currentUser.uid , "Favorites", props.strDrink));
        }
        if (dataArray.includes(props.idDrink) == false){
            try {  
                const docRef = await setDoc(doc(db, "Users", currentUser.uid , "Favorites", props.strDrink), {
                    idDrink: props.idDrink,
                    strDrink: props.strDrink,
                    strDrinkThumb: props.strDrinkThumb
                });
                
                console.log("Success");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
    
  return (
    <div>
         <button className = 'favIcon' onClick={addFav}><FontAwesomeIcon icon={faStar} /></button>
    
    </div>
  );
};

export default AddDatabase;