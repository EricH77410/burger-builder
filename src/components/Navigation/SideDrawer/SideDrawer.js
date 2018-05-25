import React from 'react'
import classes from './SideDrawer.css';
import Aux from '../../../hoc/haux/haux'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props) => {
    let attachClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>            
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>       
    );
};

export default sideDrawer;