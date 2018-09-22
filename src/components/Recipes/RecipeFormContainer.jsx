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
        name: '',
        description: '',
        ingredients: '',
      }
    };
  }

  componentDidMount(){
    if(this.props.recipe){
      this.setState({
        name: this.props.recipe.name,
        description: this.props.recipe.description,
        style: this.props.recipe.style,
        batchSize: this.props.recipe.batchSize,
        ingredients: this.props.recipe.ingredients,
        instructions: this.props.recipe.instructions
      })
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const formValid = this.validateForm();
    if(formValid){
      const { name, style, batchSize, description, ingredients, instructions } = this.state;
      this.props.handleFormSubmit({ name, style, batchSize, description, ingredients, instructions });
    }
  }

  clearErrors = () => {
    this.setState( { errors: {
      newIngredientName: '',
      newIngredientAmount: '',
      newIngredientType: '',
      instruction: '',
      name: '',
      description: '',
      ingredients: '',
    }});
  }

  validateForm = () => {
    this.clearErrors();
    let isValid = true;
    let errors = {};
    if(this.state.name === ''){
      errors.name = 'Please enter a name for this drink.';
      isValid = false;
    }
    if(this.state.description === ''){
      errors.description = 'Please provide a description for this drink';
      isValid = false;
    }
    if(this.state.style === ''){
      errors.style = 'Be a sport and add a style.';
      isValid = false;
    }
    if(this.state.batchSize === ''){
      errors.batchSize = "What's the batch size?";
      isValid = false;
    }
    if(this.state.ingredients.length === 0){
      errors.ingredients = "Can't have beer without ingredients...";
      isValid = false;
    }
    if(this.state.instructions.length === 0){
      errors.instruction = 'You really want to leave this to fate?';
      isValid = false;
    }
    this.setState({errors});
    return isValid;
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
    this.setState({ errors });
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
