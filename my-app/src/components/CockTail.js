import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faWineGlass, faMartiniGlass } from '@fortawesome/free-solid-svg-icons'
import AddFavorite from './Functions/AddFavorite';
import { collection, getDocs } from "firebase/firestore";
import { db } from './Functions/Firebase';
import { motion } from 'framer-motion';

// Animation variants
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

function CockTail() {
  let newObject = window.localStorage.getItem("currentUser");
  let currentUser = JSON.parse(newObject)

  const location = useLocation();
  const currentCocktail = location.state;

  let [data, setData] = useState(null)
  let [isFav, setIsFav] = useState(null)
  let [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  let gettingInfo = async () => {
    let dataArray = []
    setIsLoading(true)

    if (currentUser) {
      const querySnapshot = await getDocs(collection(db, "Users/", currentUser.uid, "/Favorites"));
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data().idDrink)
      });
      setIsFav(dataArray);
    }

    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + currentCocktail.idDrink)
      .then(function (response) {
        setData(response.data.drinks)
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

  useEffect(() => {
    gettingInfo()
  }, [])

  // Helper to get all ingredients
  const getIngredients = (drink) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient,
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  return (
    <div>
      {isLoading && (
        <div className='gridContainer'>
          <motion.div
            className='detail-skeleton'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className='skeleton-image' style={{ height: '400px', borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0' }}></div>
            <div style={{ padding: '2rem' }}>
              <div className='skeleton-text' style={{ height: '32px', marginBottom: '1.5rem', width: '60%' }}></div>
              <div className='skeleton-text' style={{ height: '20px', marginBottom: '1rem', width: '40%' }}></div>
              <div className='skeleton-text' style={{ height: '20px', width: '80%' }}></div>
            </div>
          </motion.div>
        </div>
      )}

      {!isLoading && data && data.length > 0 && (
        <>
          {data.map((drink, index) => {
            const ingredients = getIngredients(drink);

            return (
              <motion.div
                key={index}
                className="cardContainer-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Hero Image Section */}
                <div className="detail-hero">
                  <motion.img
                    className="detail-hero-image"
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="detail-hero-overlay">
                    <motion.h1
                      className="detail-hero-title"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {drink.strDrink}
                    </motion.h1>
                    <motion.div
                      className="detail-hero-meta"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <span className="detail-hero-badge">
                        <FontAwesomeIcon icon={faWineGlass} />
                        {drink.strGlass}
                      </span>
                      {drink.strCategory && (
                        <span className="detail-hero-badge">
                          <FontAwesomeIcon icon={faMartiniGlass} />
                          {drink.strCategory}
                        </span>
                      )}
                      {drink.strAlcoholic && (
                        <span className="detail-hero-badge detail-hero-badge-accent">
                          {drink.strAlcoholic}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  {/* Navigation buttons */}
                  <motion.div
                    className="detail-nav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.button
                      className="detail-back-btn"
                      onClick={goBack}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </motion.button>
                    <div className="detail-fav-btn">
                      {isFav && isFav.includes(drink.idDrink) ? (
                        <AddFavorite
                          strDrink={drink.strDrink}
                          idDrink={drink.idDrink}
                          strDrinkThumb={drink.strDrinkThumb}
                          isFav={true}
                        />
                      ) : (
                        <AddFavorite
                          strDrink={drink.strDrink}
                          idDrink={drink.idDrink}
                          strDrinkThumb={drink.strDrinkThumb}
                          isFav={false}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <motion.div
                  className="detail-content"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Ingredients */}
                  <motion.div className="detail-section" variants={sectionVariants}>
                    <h3 className="detail-section-title">Ingredients</h3>
                    <div className="ingredients-grid">
                      {ingredients.map((item, idx) => (
                        <motion.span
                          key={idx}
                          className="ingredient-pill"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                        >
                          <span className="ingredient-name">{item.ingredient}</span>
                          {item.measure && <span className="ingredient-measure">({item.measure})</span>}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Instructions */}
                  <motion.div className="detail-section" variants={sectionVariants}>
                    <h3 className="detail-section-title">Instructions</h3>
                    <p className="detail-instructions">{drink.strInstructions}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </>
      )}

      {error && (
        <motion.p
          className='favText'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Error loading drink details. Please try again.
        </motion.p>
      )}
    </div>
  );
}

export default CockTail;
