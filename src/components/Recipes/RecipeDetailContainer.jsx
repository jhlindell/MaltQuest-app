import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getRecipeById, clearSingleRecipe, deleteRecipe } from '../../actions/';
import RecipeDetailDisplay from './RecipeDetailDisplay';

class RecipeDetail extends Component{
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getRecipeById(id, this.fetchErrorRedirect);
  }

  componentWillUnmount(){
    this.props.clearSingleRecipe();
  }

  fetchErrorRedirect = () => {
    this.props.history.push('/recipes');
  }

  deleteSuccess = () => {
    this.props.history.push('/recipes')
  }

  deleteItem = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id, this.deleteSuccess);
  }

  renderIngredients = () => {
    const ingArray = this.props.recipe.ingredients;
    ingArray.sort((a,b) => {
      if(a.measure > b.measure){
        return -1;
      } 
      if(a.measure < b.measure) {
        return 1;
      }
      return 0
    });
    return ingArray.map((ingredient) => {
      return <tr key={ingredient.name}>
        <td>{ingredient.measure.toFixed(2)}</td>
        <td>{ingredient.unit}</td>
        <td>{ingredient.name}</td>
      </tr>
    })
  }

  render(){
    return (
      <RecipeDetailDisplay
        recipe={ this.props.recipe }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps(state){
  return { recipe: state.recipe }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeById, clearSingleRecipe, deleteRecipe }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);