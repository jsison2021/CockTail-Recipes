import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import CardDisplay from './Functions/CardDisplay';
import { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faWineGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs } from "firebase/firestore";
import { db } from './Functions/Firebase';
import { motion, AnimatePresence } from 'framer-motion';

// Quick filter options
const QUICK_FILTERS = [
  { label: 'Alcoholic', value: 'Alcoholic', type: 'alcoholic' },
  { label: 'Non-Alcoholic', value: 'Non_Alcoholic', type: 'alcoholic' },
  { label: 'Cocktail', value: 'Cocktail', type: 'category' },
  { label: 'Shot', value: 'Shot', type: 'category' },
  { label: 'Ordinary Drink', value: 'Ordinary_Drink', type: 'category' },
  { label: 'Champagne Flute', value: 'Champagne_flute', type: 'glass' },
];

// Loading skeleton component
const LoadingSkeleton = () => {
  return (
    <div className='gridContainer'>
      <div className='grid'>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <motion.div
            key={item}
            className='card-skeleton'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.08, duration: 0.4 }}
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
const EmptyState = () => {
  return (
    <motion.div
      className='empty-state'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FontAwesomeIcon className='empty-state-icon' icon={faWineGlass} />
      <p className='empty-state-text'>No cocktails found. Try a different search!</p>
    </motion.div>
  );
};

function AllDrinks() {
  let newObject = window.localStorage.getItem("currentUser");
  let currentUser = JSON.parse(newObject)
  let [data, setData] = useState(null)
  let [isFav, setIsFav] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)
  let dataArray = []

  // Fetch favorites
  const fetchFavorites = async () => {
    if (currentUser) {
      const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid, "/Favorites"));
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data().idDrink)
      });
      setIsFav(dataArray);
    }
  }

  // Search by name
  let gettingInfo = async (e) => {
    setIsLoading(true)
    setActiveFilter(null)
    await fetchFavorites()

    if (e === "" || e === undefined) {
      e = "a";
    }

    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + e)
      .then(function (response) {
        setData(response.data.drinks)
        setSearchKey(prev => prev + 1)
        setIsLoading(false)
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          console.log(error)
          setError('Cant find record')
        } else {
          setError('Unexpected Error')
        }
        setIsLoading(false)
      })
  }

  // Filter by category, glass, or alcoholic
  const filterByType = async (filter) => {
    setIsLoading(true)
    setSearchTerm('')
    setActiveFilter(filter)
    await fetchFavorites()

    let url = ''
    if (filter.type === 'alcoholic') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filter.value}`
    } else if (filter.type === 'category') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.value}`
    } else if (filter.type === 'glass') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${filter.value}`
    }

    axios
      .get(url)
      .then(function (response) {
        setData(response.data.drinks)
        setSearchKey(prev => prev + 1)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error)
        setError('Cant find record')
        setIsLoading(false)
      })
  }

  // Clear filter
  const clearFilter = () => {
    setActiveFilter(null)
    gettingInfo('')
  }

  useEffect(() => {
    gettingInfo()
  }, [])

  return (
    <AnimatedPage>
      <motion.p
        className='pageHeader'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Discover
      </motion.p>

      <motion.div
        className='search-container'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FontAwesomeIcon className='searchIcon' icon={faMagnifyingGlass} />
        <input
          className='searchBar'
          placeholder='Search for a cocktail...'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            gettingInfo(e.target.value)
          }}
        />
      </motion.div>

      {/* Quick Filters */}
      <motion.div
        className='filter-container'
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {activeFilter && (
          <motion.button
            className='filter-chip filter-chip-clear'
            onClick={clearFilter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faXmark} />
            Clear
          </motion.button>
        )}
        {QUICK_FILTERS.map((filter, index) => (
          <motion.button
            key={filter.value}
            className={`filter-chip ${activeFilter?.value === filter.value ? 'filter-chip-active' : ''}`}
            onClick={() => filterByType(filter)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingSkeleton key="loading" />}

        {!isLoading && data && data.length > 0 && (
          <CardDisplay key={searchKey} data={data} fav={isFav}></CardDisplay>
        )}

        {!isLoading && (!data || data.length === 0) && <EmptyState key="empty" />}
      </AnimatePresence>

      {error && <p className='favText'>Something went wrong. Please try again.</p>}
    </AnimatedPage>
  )
}

export default AllDrinks;
