import React, { Component } from 'react';
import RecipeFormDisplay from './RecipeFormDisplay';

class RecipeFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredients: [],
      instructions: [],
      style: '',
      batchSize: '',
      newIngredientName: '',
      newIngredientAmount: '',
      newIngredientType: '',
      newInstruction: '',
      errors: {
        newIngredientName: '',
        newIngredientAmount: '',
        newIngredientType: '',
        instruction: '',
      }
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, style, batchSize, description, ingredients, instructions } = this.state;
    this.props.handleFormSubmit({ name, style, batchSize, description, ingredients, instructions });
  }

  clearErrors = () => {
    this.setState( { ingredientErrors: {
      newIngredientName: '',
      newIngredientAmount: '',
      newIngredientType: '',
    }});
  }

  //ingredient methods

  addIngredient = () => {
    const ingredientValid = this.validateIngredient();
    if(ingredientValid){
      const ingArray = this.state.ingredients;
        const newIngredient = { 
        type: this.state.newIngredientType, 
        amount: this.state.newIngredientAmount, 
        name: this.state.newIngredientName,
      };
      ingArray.push(newIngredient);
      this.setState({ 
        ingredients: ingArray, 
        newIngredientAmount: '', 
        newIngredientName: '',
        newIngredientType: ''
      }); 
    }
  }

  removeIngredient = (index) => {
    const ingArray = this.state.ingredients;
    ingArray.splice(index, 1);
    this.setState({ ingredients: ingArray });
  }

  validateIngredient = () => {
    this.clearErrors();
    let errors = {};
    let isValid = true;
    
    if(Number(this.state.newIngredientAmount) <= 0) {
      errors.newIngredientAmount = 'Please enter a positive ingredient amount';
      isValid = false;
    }

    if(this.state.newIngredientName === ''){
      errors.newIngredientName = 'Please enter an ingredient';
      isValid = false;
    }

    if(this.state.newIngredientType === ''){
      errors.newIngredientType = 'Please enter an ingredient type';
      isValid = false;
    }
    this.setState({ errors }, ()=> console.log(this.state));
    return isValid;
  }

  // instruction methods
  addInstruction = () => {
    const instructionValid = this.validateInstruction();
    if(instructionValid){
      const insArray = this.state.instructions;
      insArray.push(this.state.newInstruction);
      this.setState({ instructions: insArray, newInstruction: ''});
    }
  }

  removeInstruction = (index) => {
    const insArray = this.state.instructions;
    insArray.splice(index, 1);
    this.setState({ instructions: insArray });
  }

  validateInstruction = () => {
    this.clearErrors();
    let errors = {};
    let isValid = true;
    if(this.state.newInstruction === ''){
      errors.instruction = 'Please enter instruction text.';
      isValid = false;
    }
    this.setState({errors});
    return isValid;
  }

  render(){
    return (
      <RecipeFormDisplay 
        state={ this.state }
        handleFormSubmit={ this.handleFormSubmit }
        handleInputChange={ this.handleInputChange }
        cancel={ this.props.cancel }
        addIngredient={ this.addIngredient }
        removeIngredient={ this.removeIngredient }
        addInstruction={ this.addInstruction }
        removeInstruction={ this.removeInstruction }
      />
    );
  }
}

export default RecipeFormContainer;
