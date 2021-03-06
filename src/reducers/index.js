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

function recipe(state = null, action){
  switch(action.type){
    case 'SINGLE_RECIPE':
      return action.payload;
    case 'CLEAR_SINGLE_RECIPE':
      return null;
    default:
      return state;
  }
}

function newIngredient(state = null, action){
  switch(action.type){
    case 'NEW_INGREDIENT':
      return action.payload;
    case 'CLEAR_NEW_INGREDIENT':
      return null;
    default:
      return state;
  }
}

function ingredient(state = null, action){
  switch(action.type){
    case 'SINGLE_INGREDIENT':
      return action.payload;
    case 'CLEAR_SINGLE_INGREDIENT':
      return null;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  ingredientList,
  recipeList,
  recipe,
  newIngredient,
  ingredient
});

export default appReducer;