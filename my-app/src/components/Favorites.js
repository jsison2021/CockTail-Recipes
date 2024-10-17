import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import GetFavorites from './Functions/GetFavorites';

function Saved(){
   return(
      <AnimatedPage>
       <p className='pageHeader'>My Favorites</p>
       <GetFavorites></GetFavorites>
      </AnimatedPage>
      
   )
   
}

export default  Saved;