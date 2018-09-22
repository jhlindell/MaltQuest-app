import axios from 'axios';
const URL = 'http://localhost:8000';

export function getIngredientList(page, limit, search){
  let queryString = `?page=${page}&limit=${limit}`;
  if(search){
    queryString += `&search=${search}`;
  }
  return (dispatch) => {
    axios.get(`${URL}/api/ingredients${queryString}`)
      .then((response) => {
        dispatch({ type: 'SET_INGREDIENT_LIST', payload: response.data });
      })
      .catch((err)=> {
        console.log(err);
      });
  }
}

export function clearIngredientList(){
  return { type: 'CLEAR_INGREDIENT_LIST' };
}

export function getRecipeList(page, limit, search){
  let queryString = `?page=${page}&limit=${limit}`;
  if(search){
    queryString += `&search=${search}`;
  }
  return (dispatch) => {
    axios.get(`${URL}/api/recipes${queryString}`)
      .then((response) => {
        dispatch({ type: 'SET_RECIPE_LIST', payload: response.data });
      })
      .catch((err)=> {
        console.log(err);
      });
  }
}

export function clearRecipeList(){
  return { type: 'CLEAR_RECIPE_LIST' };
}

export function createRecipe(recipe, success, failure){
  return (dispatch) => {
    axios.post(`${URL}/api/recipes/`, recipe)
      .then((response) => {
        success(response.data._id);
      })
      .catch((err)=> {
        console.log(err);
        failure();
      });
  }
}

export function getRecipeById(id, failure){
  return (dispatch) => {
    axios.get(`${URL}/api/recipes/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_RECIPE', payload: response.data });
      })
      .catch((err)=> {
        console.log(err);
        failure();
      });
  }
}

export function clearSingleRecipe(){
  return { type: 'CLEAR_SINGLE_RECIPE' };
}

export function deleteRecipe(id, success){
  return (dispatch) => {
    axios.delete(`${URL}/api/recipes/${id}`)
      .then((response) => {
        console.log(`success in deleting item ${id}`);
        success();
      })
      .catch((err)=> {
        console.log(err);
      });
  }
}

export function editRecipe(id, recipe, success){
  return (dispatch) => {
    axios.put(`${URL}/api/recipes/${id}`, recipe)
      .then((response)=> {
        success();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function createIngredient(ingredient, success){
  return (dispatch) => {
    axios.post(`${URL}/api/ingredients`, ingredient)
      .then((response) => {
        dispatch({ type: 'NEW_INGREDIENT', payload: response.data });
        success();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function clearNewIngredient(){
  return { type: 'CLEAR_NEW_INGREDIENT' };
}

export function deleteIngredient(id, success){
  return (dispatch) => {
    axios.delete(`${URL}/api/ingredients/${id}`)
      .then((response) => {
        success();
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function getIngredientById(id){
  return (dispatch) => {
    axios.get(`${URL}/api/ingredients/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_INGREDIENT', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function clearSingleIngredient(){
  return { type: 'CLEAR_SINGLE_INGREDIENT' };
}

export function editIngredient(id, ingredient, success){
  return (dispatch) => {
  axios.put(`${URL}/api/ingredients/${id}`, ingredient)
    .then((response) => {
      success();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}