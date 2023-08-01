import React from 'react'
import AnimatedPage from './Functions/AnimatedPage';
import CardDisplay from './Functions/CardDisplay';


function AllDrinks(){

   

   return(

      <AnimatedPage>       
         <p className='pageHeader'>Find your Drink</p>
         <div className='gridContainer'>
            <div className='grid'>
               <CardDisplay></CardDisplay>

            </div>
         </div>
         
      </AnimatedPage>
   )
   
}

export default  AllDrinks;