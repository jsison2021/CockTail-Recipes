import React from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faStar } from '@fortawesome/free-solid-svg-icons'

import AddFavorite from "./Functions/AddFavorite"

function CockTail(){

   const location = useLocation();

   const currentCocktail = location.pathname.replace("/", "");   
   
   let [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

   let gettingInfo = () =>{
     
      axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + currentCocktail)
      .then(function (response) {
         // handle success
         setData(response.data.drinks)
      })
      .catch(function (error) {
         // handle error
         if (error.response.status === 400) {
            console.log(error)
            setError('Cant find record')
         } else {
            setError('Unexpected Error')
         }
      })
      .then(function () {
         // always executed
      })
      
   }
    
    useEffect(() => {
      gettingInfo()
 
    }, [])
  return (
   <div>
      {data && data.length > 0 && (
         <>
            {data.map((drink, index) => {
            return (
               <div  key={index}>
            
                  <Card className="cardContainer-2">
                     <Card.Body>
                           <button className = "backIcon" onClick={goBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
                           <AddFavorite strDrink = {drink.strDrink} idDrink = {drink.idDrink} strDrinkThumb = {drink.strDrinkThumb}></AddFavorite>
                           <Card.Text>
                              <img className = 'cocktailImage-2' src = {drink.strDrinkThumb}  alt = "drink"></img>
                           </Card.Text>     
                           <Card.Text className='cocktailText-2' >{drink.strDrink}</Card.Text>   
                           <Card.Text className='cocktailText-3' >Glass Type: </Card.Text>   
                           <Card.Text className='cocktailText-4' >{drink.strGlass}</Card.Text> 
                           <Card.Text className='cocktailText-3' >Ingredients: </Card.Text>      
                           {drink.strMeasure1 && <Card.Text className='cocktailText-4' >{drink.strIngredient1} - ({drink.strMeasure1}) </Card.Text>}
                           {drink.strMeasure2 && <Card.Text className='cocktailText-4' >{drink.strIngredient2} - ({drink.strMeasure2}) </Card.Text>}
                           {drink.strMeasure3 && <Card.Text className='cocktailText-4' >{drink.strIngredient3} - ({drink.strMeasure3}) </Card.Text>}
                           {drink.strMeasure4 && <Card.Text className='cocktailText-4' >{drink.strIngredient4} - ({drink.strMeasure4}) </Card.Text>}
                           {drink.strMeasure5 && <Card.Text className='cocktailText-4' >{drink.strIngredient5} - ({drink.strMeasure5}) </Card.Text>}
                           {drink.strMeasure6 && <Card.Text className='cocktailText-4' >{drink.strIngredient6} - ({drink.strMeasure6}) </Card.Text>}
                           {drink.strMeasure7 && <Card.Text className='cocktailText-4' >{drink.strIngredient7} - ({drink.strMeasure7}) </Card.Text>}
                           {drink.strMeasure8 && <Card.Text className='cocktailText-4' >{drink.strIngredient8} - ({drink.strMeasure8}) </Card.Text>}
                           {drink.strMeasure9 && <Card.Text className='cocktailText-4' >{drink.strIngredient9} - ({drink.strMeasure9}) </Card.Text>}
                           {drink.strMeasure10 && <Card.Text className='cocktailText-4' >{drink.strIngredient10} - ({drink.strMeasure10}) </Card.Text>}
                           {drink.strMeasure11 && <Card.Text className='cocktailText-4' >{drink.strIngredient11} - ({drink.strMeasure11}) </Card.Text>}
                           {drink.strMeasure12 && <Card.Text className='cocktailText-4' >{drink.strIngredient12} - ({drink.strMeasure12}) </Card.Text>}
                           {drink.strMeasure13 && <Card.Text className='cocktailText-4' >{drink.strIngredient13} - ({drink.strMeasure13}) </Card.Text>}
                           {drink.strMeasure14 && <Card.Text className='cocktailText-4' >{drink.strIngredient14} - ({drink.strMeasure14}) </Card.Text>}
                          

                           <Card.Text className='cocktailText-3' >Instructions: </Card.Text>  
                           <Card.Text className='cocktailText-4' >{drink.strInstructions}</Card.Text>
                     </Card.Body>
                  </Card>
               
               </div>
            );
            })}
      
      </>
      )}
      {error && <p>Error with the data</p>}
   </div>
  );
};


export default  CockTail;