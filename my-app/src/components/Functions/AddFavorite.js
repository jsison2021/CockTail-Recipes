import React from 'react';
import { collection, setDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from './Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddFavorite = (props) => {
  let newObject = window.localStorage.getItem("currentUser");
  let currentUser = JSON.parse(newObject)
  let navigate = useNavigate();
  const location = useLocation();

  const [isFav, setisFav] = useState(props.isFav)
  const [isAnimating, setIsAnimating] = useState(false)

  const addFav = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let dataArray = []

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)

    if (isFav) {
      setisFav(false)
    }

    if (!isFav) {
      setisFav(true)
    }

    if (currentUser) {
      const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid, "/Favorites"));
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data().idDrink)
      });

      if (dataArray.includes(props.idDrink) === true) {
        console.log("duplicate")
        await deleteDoc(doc(db, "Users", currentUser.uid, "Favorites", props.strDrink));
      }

      if (dataArray.includes(props.idDrink) === false) {
        try {
          await setDoc(doc(db, "Users", currentUser.uid, "Favorites", props.strDrink), {
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

      if (location.pathname === ('/Favorites')) {
        window.location.reload()
      }
    }

    if (!currentUser) {
      navigate('/Favorites')
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <AnimatePresence mode="wait">
        {isFav ? (
          <motion.button
            key="favorited"
            className="favIcon-2"
            onClick={addFav}
            initial={{ scale: 0.8 }}
            animate={{
              scale: isAnimating ? [1, 1.3, 1] : 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              scale: isAnimating ? {
                duration: 0.6,
                times: [0, 0.4, 1],
                ease: [0.34, 1.56, 0.64, 1]
              } : {}
            }}
          >
            <FontAwesomeIcon icon={faStar} />
          </motion.button>
        ) : (
          <motion.button
            key="not-favorited"
            className="favIcon"
            onClick={addFav}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15
            }}
          >
            <FontAwesomeIcon icon={faStar} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddFavorite;
