import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import AddDatabase from './Functions/AddDatabase';
import GetDatabase from './Functions/GetDatabase';

function Saved(){
   return(
      <AnimatedPage>
       <p className='pageHeader'>Favorites</p>
       <AddDatabase></AddDatabase>
       <GetDatabase></GetDatabase>
      </AnimatedPage>
      
   )
   
}

export default  Saved;