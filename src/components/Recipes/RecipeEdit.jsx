import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRecipeById, editRecipe } from '../../actions';
import RecipeForm from './RecipeFormContainer';

class RecipeEdit extends Component{
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getRecipeById(id, this.redirectToRecipes);
  }

  editRecipe = (recipe) => {
    const { name, description, ingredients, instructions, style, batchSize } = recipe;
    this.props.editRecipe(this.props.match.params.id, 
      { name, description, style, batchSize, ingredients, instructions }, 
      this.editRedirect);
  }

  redirectToRecipes = () => {
    this.props.history.push('/recipes/');
  }

  editRedirect = () => {
    this.props.history.push(`/recipes/${ this.props.match.params.id }`);
  }

  render(){
    return (
      <RecipeForm 
        handleFormSubmit = { this.editRecipe }
        cancel = { this.editRedirect }
        recipe = { this.props.recipe }
        { ...this.props }
      />
    )
  }
}

function mapStateToProps(state){
  return { recipe: state.recipe };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeById, editRecipe }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);