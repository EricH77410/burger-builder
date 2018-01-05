import React from 'react'

import classes from './Order.css';

const order = (props) => {
    
    const ingredients = [];
    for (let ingName in props.ingredients) {
       ingredients.push({
           name: ingName,
           qty: props.ingredients[ingName]
       })
    }
    const ingredientsOutput = ingredients.map((ing) => {
        return <span
                    className={classes.Ingredients} 
                    key={ing.name}>{ing.name} ({ing.qty})
                </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} €</strong></p>
        </div>
    )
};

export default order;