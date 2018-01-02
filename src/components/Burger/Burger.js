import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // Transforme l'objet ingredients en tableau puis map dessus en fonction de la quantité
    let transformedIngredients = Object.keys(props.ingredients)
        .map((ingKey) => {
            return [...Array(props.ingredients[ingKey])].map((_, i)=>{ // ici c'est pour la quantité
                return <BurgerIngredient key={ingKey+i} type={ingKey} />
            });
        }).reduce((arr, el)=>{
            return arr.concat(el)
        },[]);

        if (transformedIngredients.length === 0 ) {
            transformedIngredients = <p>Please start adding ingredients !</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;