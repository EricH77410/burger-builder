import React from 'react';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // Transforme l'objet ingredients en tableau puis map dessus en fonction de la quantité
    const transformedIngredients = Object.keys(props.ingredients)
        .map((ingKey) => {
            return [...Array(props.ingredients[ingKey])].map((_, i)=>{ // ici c'est pour la quantité
                return <BurgerIngredient key={ingKey+i} type={ingKey} />
            });
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;