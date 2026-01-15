import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import { Link } from 'react-router-dom';
import AddFavorite from './Functions/AddFavorite';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './Functions/Firebase';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

// Featured loading skeleton component
const LoadingSkeleton = () => {
  return (
    <div className='featured-section'>
      <div className='featured-grid'>
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className='featured-skeleton'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.15, duration: 0.5 }}
          >
            <div className='skeleton-image'></div>
            <div className='skeleton-text'></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Animation variants for featured cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

function Home() {
  let newObject = window.localStorage.getItem("currentUser");
  let currentUser = JSON.parse(newObject)
  let [data1, setData1] = useState(null)
  let [data2, setData2] = useState(null)
  let [data3, setData3] = useState(null)
  let [isFav, setIsFav] = useState(null)
  let [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(null)

  const gettingList = async () => {
    let dataArray = []
    setIsLoading(true)

    if (currentUser) {
      const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid, "/Favorites"));
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data().idDrink)
      });
      setIsFav(dataArray);
    }

    axios.all([
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001`),
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11003`),
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`)
    ])
      .then(axios.spread((response1, response2, response3) => {
        setData1(response1.data.drinks)
        setData2(response2.data.drinks)
        setData3(response3.data.drinks)
        setIsLoading(false)
      })
      )
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          console.log(error)
          setError('Cant find record')
        } else {
          setError('Unexpected Error')
        }
        setIsLoading(false)
      });

  }

  useEffect(() => {
    gettingList()
  }, [])

  // Combine all drinks into one array
  const allDrinks = [];
  if (data1 && data1.length > 0) allDrinks.push(...data1);
  if (data2 && data2.length > 0) allDrinks.push(...data2);
  if (data3 && data3.length > 0) allDrinks.push(...data3);

  return (
    <AnimatedPage>
      <motion.p
        className='pageHeader'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Trending Now
      </motion.p>

      {isLoading && <LoadingSkeleton />}

      {!isLoading && allDrinks.length > 0 && (
        <div className='featured-section'>
          <motion.div
            className='featured-grid'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {allDrinks.map((drink, index) => (
              <motion.div
                className="featured-card"
                key={drink.idDrink || index}
                variants={cardVariants}
              >
                <Link to={drink.strDrink} state={drink} className="card-link">
                  <div className='card-img-wrapper'>
                    <img className='cocktailImage' src={drink.strDrinkThumb} alt={drink.strDrink} />
                  </div>
                  <div className='cocktailText'>{drink.strDrink}</div>
                </Link>
                <div className='featured-top-bar'>
                  <span className='featured-badge'>
                    <FontAwesomeIcon icon={faStar} className='featured-badge-icon' />
                    Popular
                  </span>
                  <div className='overlay-buttons'>
                    {isFav && isFav.includes(drink.idDrink) ?
                      <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={true} />
                      :
                      <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={false} />
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {error && <p className='favText'>Something went wrong. Please try again.</p>}
    </AnimatedPage>
  )

}

export default Home;
