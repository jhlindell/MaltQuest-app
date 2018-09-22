import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Nav/Footer';
import Navbar from './components/Nav/Navbar';

import HomePage from './components/HomePage';
import IngredientList from './components/Ingredients/IngredientListContainer';
import RecipeCreate from './components/Recipes/RecipeCreate';
import RecipeDetail from './components/Recipes/RecipeDetailContainer';
import RecipeEdit from './components/Recipes/RecipeEdit';
import RecipeList from './components/Recipes/RecipeListContainer';

const styles = {
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  flex0: {
    flex: 0
  },

  flex1: {
    display: 'flex',
    flex: '1 1 100%',
  },

  autoMargin: {
    display: 'flex',
    margin: 'auto'
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={ styles.flexColumn }>
          <div style={ styles.flex0 }>
            <Navbar />
          </div>
          <div style={ styles.flex1 } id="mainBlock">
            <Switch>
              <Route exact path='/ingredients' component={ IngredientList } />

              <Route exact path='/recipes/edit/:id' component={ RecipeEdit } />
              <Route exact path='/recipes/create' component={ RecipeCreate } />
              <Route exact path='/recipes' component={ RecipeList } />
              <Route exact path='/recipes/:id' component={ RecipeDetail } />

              <Route exact path='/' component={ HomePage } />
            </Switch>
          </div>
          <div style={ styles.flex0 }>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
