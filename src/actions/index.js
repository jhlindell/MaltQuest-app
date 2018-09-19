// import axios from 'axios';

const ingredients = [
  { name: 'light malt extract', type: 'extract'},
  { name: 'dark malt extract', type: 'extract'},
  { name: 'amber malt extract', type: 'extract'},
  { name: 'light malt', type: 'grain'},
  { name: 'chocolate malt', type: 'grain'},
  { name: 'cascade hops', type: 'hops'},
  { name: 'fuggle hops', type: 'hops'},
  { name: 'ale yeast', type: 'yeast'},
  { name: 'lager yeast', type: 'yeast'},
]

export function getIngredientList(){
  return (dispatch) => {
    dispatch({ type: 'SET_INGREDIENT_LIST', payload: ingredients });
  }
}

export function clearIngredientList(){
  return { type: 'CLEAR_INGREDIENT_LIST' }
}