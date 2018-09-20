import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions';
import RecipeForm from './RecipeFormContainer';

class RecipeCreate extends Component {
  createRecipe = (recipe) => {
    const { name, description, ingredients, instructions, style, batchSize } = recipe;
    console.log({ name, description, ingredients, instructions, style, batchSize });
    this.props.history.push('/recipes');
  }

  cancel = () => {
    this.props.history.push('/recipes');
  }

  render(){
    return (
      <RecipeForm 
        handleFormSubmit={this.createRecipe}
        cancel={this.cancel}
        {...this.props}
      />
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createRecipe }, dispatch);
}

export default connect(null, mapDispatchToProps)(RecipeCreate);