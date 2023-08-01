import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import HomeCardDisplay from './Functions/HomeCardDisplay';

function Home(){
   
   return(
      <AnimatedPage>
         <p className='pageHeader'>Top 3 Choices</p>
         <HomeCardDisplay></HomeCardDisplay>
      </AnimatedPage>
      
   )
   
}

export default  Home;