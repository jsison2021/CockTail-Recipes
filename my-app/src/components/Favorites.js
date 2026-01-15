import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import GetFavorites from './Functions/GetFavorites';
import { motion } from 'framer-motion';

function Saved() {
  return (
    <AnimatedPage>
      <motion.p
        className='pageHeader'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        My Favorites
      </motion.p>
      <GetFavorites />
    </AnimatedPage>
  )
}

export default Saved;
