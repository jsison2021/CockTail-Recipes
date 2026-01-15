import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './Firebase';
import CardDisplay from "./CardDisplay"
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faWineGlass } from '@fortawesome/free-solid-svg-icons'

// Loading skeleton component
const LoadingSkeleton = () => {
  return (
    <div className='gridContainer'>
      <div className='grid'>
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className='card-skeleton'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1, duration: 0.4 }}
          >
            <div className='skeleton-image'></div>
            <div className='skeleton-text'></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Empty state component
const EmptyState = ({ icon, text }) => {
  return (
    <motion.div
      className='empty-state'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <FontAwesomeIcon className='empty-state-icon' icon={icon} />
      <p className='empty-state-text'>{text}</p>
    </motion.div>
  );
};

const GetDatabase = () => {
  let [data, setData] = useState(null)
  let [isLoading, setIsLoading] = useState(true)
  let newObject = window.localStorage.getItem("currentUser");
  let currentUser = JSON.parse(newObject)
  let [isFav, setIsFav] = useState(null)
  let dataArray = []
  let favArray = []

  const gettingList = async () => {
    setIsLoading(true)
    if (currentUser) {
      const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid, "/Favorites"));
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data())
        favArray.push(doc.data().idDrink)
      });
      setData(dataArray);
      setIsFav(favArray)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    gettingList()
  }, [])

  return (
    <div>
      {isLoading && currentUser && <LoadingSkeleton />}

      {!isLoading && data && data.length > 0 && (
        <CardDisplay data={data} fav={isFav} onClick={gettingList} />
      )}

      {!isLoading && !currentUser && (
        <EmptyState
          icon={faHeart}
          text="Sign in to add your favorite drinks!"
        />
      )}

      {!isLoading && data && data.length === 0 && currentUser && (
        <EmptyState
          icon={faWineGlass}
          text="Start adding your favorite drinks!"
        />
      )}
    </div>
  );
};

export default GetDatabase;
