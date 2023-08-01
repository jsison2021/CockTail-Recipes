import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios"; 
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const HomeCardDisplay = () => {
    let [data1, setData1] = useState(null)
    let [data2, setData2] = useState(null)
    let [data3, setData3] = useState(null)

    const [error, setError] = useState(null)

    let gettingInfo = () =>{
        
        axios
        .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001')
        .then(function (response) {
            // handle success
            setData1(response.data.drinks)
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
        axios
        .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007')
        .then(function (response) {
            // handle success
            setData2(response.data.drinks)
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
        axios
        .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11003')
        .then(function (response) {
            // handle success
            setData3(response.data.drinks)
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
        {data1 && data1.length && data2 && data2.length && data3 && data3.length> 0 && (
            <>
            <div className='gridContainer'>
            <div className='grid'>
            {data1.map((drink, index) => {
                return (
                    <motion.div
                        className= "cardContainer"
                        key={index}
                        whileHover={{ scale: 1.05 }}
                    >
                    <Link className='cocktailText' to = {"/" + drink.idDrink}>
                        <Card style={{ width: '18rem',height: '20rem' }}>
                        <Card.Body>
                            <button className = 'favIcon'><FontAwesomeIcon icon={faStar} /></button>
                            <Card.Text>
                                <img className = 'cocktailImage' src = {drink.strDrinkThumb}  alt = "drink"></img>
                            </Card.Text>     
                            <Card.Text className='cocktailText' >{drink.strDrink}</Card.Text>     
                        </Card.Body>
                        </Card>
                    </Link>
                    </motion.div>
                );
                
                })}

                {data2.map((drink, index) => {
                return (
                    <motion.div
                        className= "cardContainer"
                        key={index}
                        whileHover={{ scale: 1.05 }}
                    >
                    <Link className='cocktailText' to = {"/" + drink.idDrink}>
                        <Card style={{ width: '18rem',height: '20rem' }}>
                        <Card.Body>
                            <button className = 'favIcon'><FontAwesomeIcon icon={faStar} /></button>
                            <Card.Text>
                                <img className = 'cocktailImage' src = {drink.strDrinkThumb}  alt = "drink"></img>
                            </Card.Text>     
                            <Card.Text className='cocktailText' >{drink.strDrink}</Card.Text>     
                        </Card.Body>
                        </Card>
                    </Link>
                    </motion.div>
                );
                
                })}
                  {data3.map((drink, index) => {
                return (
                    <motion.div
                        className= "cardContainer"
                        key={index}
                        whileHover={{ scale: 1.05 }}
                    >
                    <Link className='cocktailText' to = {"/" + drink.idDrink}>
                        <Card style={{ width: '18rem',height: '20rem' }}>
                        <Card.Body>
                            <button className = 'favIcon'><FontAwesomeIcon icon={faStar} /></button>
                            <Card.Text>
                                <img className = 'cocktailImage' src = {drink.strDrinkThumb}  alt = "drink"></img>
                            </Card.Text>     
                            <Card.Text className='cocktailText' >{drink.strDrink}</Card.Text>     
                        </Card.Body>
                        </Card>
                    </Link>
                    </motion.div>
                );
                
                })}
            </div>
            </div>
        </>
        )}
            {error && <p>Error with the data</p>}
    </div>
    );
};

export default HomeCardDisplay;