import { combineReducers } from 'redux';

function ingredientList(state=[], action){
  switch(action.type){
    case 'SET_INGREDIENT_LIST':
      return action.payload;   
    case 'CLEAR_INGREDIENT_LIST':
      return []    
    default:
      return state;
  }
}

function recipeList(state=[], action){
  switch(action.type){
    case 'SET_RECIPE_LIST':
      return action.payload;   
    case 'CLEAR_RECIPE_LIST':
      return []    
    default:
      return state;
  }
}

const appReducer = combineReducers({
  ingredientList,
  recipeList
});

export default appReducer;