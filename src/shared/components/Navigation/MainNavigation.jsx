import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLInks';

import Backdrop from '../UIElements/Backdrop';

import './MainNavigation.css';

const MainNavigation = () => {
  const [drawerIsOpend, setDrawerIsOpend] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpend(true);
  }

  const closeDrawer = () => {
    setDrawerIsOpend(false);
  }

  return (
    <>
      {drawerIsOpend && <Backdrop onClick={closeDrawer}/>}
      {drawerIsOpend && 
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  )
};

export default MainNavigation;