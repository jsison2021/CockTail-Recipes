import React from 'react';
import { collection, setDoc, getDocs, deleteDoc, doc  } from "firebase/firestore";
import {db} from './Firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const AddFavorite = (props) => {
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
        
        if (dataArray.includes(props.idDrink) === true){
            console.log("duplicate")
            await deleteDoc(doc(db, "Users", currentUser.uid , "Favorites", props.strDrink));
            
        }
        if (dataArray.includes(props.idDrink) === false){
            try {  
                await setDoc(doc(db, "Users", currentUser.uid , "Favorites", props.strDrink), {
                    idDrink: props.idDrink,
                    strDrink: props.strDrink,
                    strDrinkThumb: props.strDrinkThumb,
                    isFav: props.isFav
                });
                
                console.log("Success");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        window.location.reload();

    }
    
  return (
    <div>
        
        {props.isFav ? <button className = 'favIcon-2' onClick={addFav}><FontAwesomeIcon icon={faStar} /></button> : <button className = 'favIcon' onClick={addFav}><FontAwesomeIcon icon={faStar} /></button>}
    
    </div>
  );
};

export default AddFavorite;