import React from 'react'
import { Link } from 'react-router-dom';
import AddFavorite from './AddFavorite';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14
    }
  }
};

const CardDisplay = (props) => {
  const [nav, setNav] = useState("")
  const location = useLocation();

  if (location.pathname === "/") {
    // Home page
  }

  if (!location.pathname === "/") {
    setNav(location.pathname + "/")
  }

  return (
    <div className='gridContainer'>
      <motion.div
        className='grid'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {props.data.map((drink, index) => {
          return (
            <motion.div
              className="cardContainer"
              key={drink.idDrink || index}
              variants={cardVariants}
            >
              <Link to={nav + drink.strDrink} state={drink} className="card-link">
                <div className='card-img-wrapper'>
                  <img className='cocktailImage' src={drink.strDrinkThumb} alt={drink.strDrink} />
                </div>
                <div className='card-overlay'>
                  <div className='overlay-buttons'>
                    {props.fav && props.fav.includes(drink.idDrink) ?
                      <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={true} />
                      :
                      <AddFavorite strDrink={drink.strDrink} idDrink={drink.idDrink} strDrinkThumb={drink.strDrinkThumb} isFav={false} />
                    }
                  </div>
                </div>
                <div className='cocktailText'>{drink.strDrink}</div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CardDisplay;
