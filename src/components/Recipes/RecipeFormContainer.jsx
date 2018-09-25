import axios from 'axios';
import React, { Component } from 'react';
import RecipeFormDisplay from './RecipeFormDisplay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createIngredient, clearNewIngredient } from '../../actions';

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
      },
      isLoading: false,
      options: [],
      selected: null,
      modal: false,
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

  componentWillReceiveProps(nextProps){
    if(nextProps.newIngredient !== null){
      this.setState({ selected: [nextProps.newIngredient] });
      this.props.clearNewIngredient();
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
      if(!this.state.selected){
        console.log('new ingredient')
        this.addIngToDB();
      } else {
        console.log('not new ingredient')
        const ingArray = this.state.ingredients;
          const newIngredient = { 
          type: this.state.newIngredientType, 
          amount: this.state.newIngredientAmount, 
          name: this.state.newIngredientName,
        };
        if(this.state.selected && this.state.selected[0]._id){
          newIngredient._id = this.state.selected[0]._id;
        }
        ingArray.push(newIngredient);
        this.setState({ 
          ingredients: ingArray, 
          newIngredientAmount: '', 
          newIngredientName: '',
          newIngredientType: ''
        });
        this.child.clearTypeahead();
      }
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
    
    if(this.state.newIngredientAmount === '') {
      errors.newIngredientAmount = 'Please enter an amount';
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

  handleATAchange = (item) => {
    if(item.length){
      this.setState({ newIngredientName: item[0].name, selected: item });
    } else {
      this.setState({ newIngredientName: '', selected: null });
    }
  }

  handleATAInputChange = (input) => {
    this.setState({ newIngredientName: input });
  }

  onItemSearch = (query) => {
    this.setState({isLoading: true});
    axios.get(`http://localhost:8000/api/ingredients?search${query}`)
      .then((response) => {
        this.setState({ options: response.data.docs, isLoading: false });
      })
      .catch((error) => {
        console.log('error getting stock items');
      });
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

  addIngToDB = () => {
    this.modalToggle();
  };

  modalToggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  handleIngModalReturn = (ingredient) => {
    this.modalToggle();
    this.props.createIngredient(ingredient, ()=> {});
  }

  render(){
    return (
      <RecipeFormDisplay 
        ref={ instance => { this.child = instance; }}
        state={ this.state }
        handleFormSubmit={ this.handleFormSubmit }
        handleInputChange={ this.handleInputChange }
        cancel={ this.props.cancel }
        addIngredient={ this.addIngredient }
        removeIngredient={ this.removeIngredient }
        addInstruction={ this.addInstruction }
        removeInstruction={ this.removeInstruction }
        onItemSearch={ this.onItemSearch }
        handleATAchange={ this.handleATAchange }
        handleATAInputChange={ this.handleATAInputChange }
        handleIngModalReturn={ this.handleIngModalReturn }
        modalToggle={ this.modalToggle }
      />
    );
  }
}

function mapStateToProps(state){
  return { newIngredient: state.newIngredient}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createIngredient, clearNewIngredient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFormContainer);
