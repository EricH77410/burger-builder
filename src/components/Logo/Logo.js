import React from 'react'

import burgerLogo from '../../assets/img/burger-logo.png'

import classes from './Logo.css'

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger Logo"/>
    </div>
)

export default logo;