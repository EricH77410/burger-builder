import React from 'react'
import classes from './ToggleDrawer.css';

const toggleDrawer = (props) => (
    <div className={classes.ToggleDrawer} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default toggleDrawer;