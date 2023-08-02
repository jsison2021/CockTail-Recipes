import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import {db, auth} from './Firebase';

const AddDatabase = () => {
    const [todo, setTodo] = useState("")
   
    const addTodo = async (e) => {
        e.preventDefault();  
        console.log(auth)
        try {
            const docRef = await setDoc(doc(db, "Users/"+ auth.currentUser.uid), {
                drinkId: [110001, 110002]
            });
            
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
  return (
    <div>
       
       <div>
            <input
                type="text"
                placeholder="What do you have to do today?"
                onChange={(e)=>setTodo(e.target.value)}
            />
        </div>

        <div className="btn-container">
            <button
                type="submit"
                className="btn"
                onClick={addTodo}
            >
                Submit
            </button>
        </div>
    </div>
  );
};

export default AddDatabase;