import React from "react";
import { Link } from 'react-router-dom';

const styles = {
  navBarStyle: {
    display: 'flex',
    height: '50px',
    width: '100%',
    backgroundColor: '#432a0d',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },

  linkText: {
    color: 'white',
    fontSize: '20px',
    textDecoration: 'none',
  },

  titleText: {
    color: 'white',
    fontSize: '24px',
    textDecoration: 'none',
  }
} 

const NavBar = () => {
  return (
    <ul style={ styles.navBarStyle }>
      <li key='recipes'>
        <Link to='/recipes' style={ styles.linkText }>Recipes</Link>
      </li>
      <li key={'home'}>
        <Link to='/' style={ styles.titleText }>MaltQuest!</Link>
      </li>
      <li key='ingredients'>
        <Link to='/ingredients' style={ styles.linkText }>Ingredients</Link>
      </li>
    </ul>
  );
}

export default NavBar;