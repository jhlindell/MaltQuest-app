import axios from 'axios';
const URL = 'http://localhost:8000';

const recipes = [
  { 
    name: 'Amazing Amber',
    style: 'Amber',
    batchSize: '5.5 gallons',
    description: 'This beautifully colored amber ale will drink like a champ and have you coming back for more',
    ingredients: [
      { name: 'amber malt extract', type: 'extract', amount: '8.0 lbs'},
      { name: 'cascade hops', type: 'hops', amount: '1.0 oz'},
      { name: 'ale yeast', type: 'yeast'},
    ],
    instructions: [
      'add extract to brew pot and fill with water',
      'add hops and boil for 60 minutes',
      'chill wort and add to carboy',
      'properly oxygenate wort',
      'pitch yeast when at temperature',
      'bottle when fermentation complete'
    ],
  },
  {
    name: 'Sofa King Stout',
    style: 'Stout',
    batchSize: '5.5 gallons',
    description: 'A beer for those stout of heart and stout of girth',
    ingredients: [
      { name: 'light malt', type: 'grain', amount: '8.0 lbs'},
      { name: 'chocolate malt', type: 'grain', amount: '1.0 lbs'},
      { name: 'roasted barley', type: 'grain', amount: '0.5 lbs'},
      { name: 'fuggle hops', type: 'hops', amount: '1.0 oz'},
      { name: 'ale yeast', type: 'yeast'},
    ],
    instructions: [
      'mash grains at 152 F',
      'sparge grains into boil pot and top with water',
      'add hops and boil for 60 minutes',
      'chill wort and add to carboy',
      'properly oxygenate wort',
      'pitch yeast when at temperature',
      'bottle when fermentation complete'
    ],
  }
];

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
      })
  }
}

export function clearIngredientList(){
  return { type: 'CLEAR_INGREDIENT_LIST' };
}

export function getRecipeList(){
  return (dispatch) => {
    dispatch({ type: 'SET_RECIPE_LIST', payload: recipes });
  }
}

export function clearRecipeList(){
  return { type: 'CLEAR_RECIPE_LIST' };
}

export function createRecipe(){
  console.log('this is where api call for creating recipe would go');
}