import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label:'Salad', type:'salad' },
    { label:'Bacon', type:'bacon' },
    { label:'Meat', type:'meat' },
    { label:'Cheese', type:'cheese' },
    { label: 'Tomato', type: 'tomato' },
    { label: 'Ognon', type: 'ognon' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
        { controls.map( ctr => (
            <BuildControl 
                key={ctr.label} 
                label={ctr.label}
                added={() => props.ingredientAdded(ctr.type)}
                removed={() => props.ingredientRemove(ctr.type)}
                disabled={props.disabled[ctr.type]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);

export default buildControls;