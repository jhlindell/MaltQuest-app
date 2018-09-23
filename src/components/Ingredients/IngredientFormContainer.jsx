import React, { Component } from 'react';
import IngredientFormDisplay from './IngredientFormDisplay';

class IngredientForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      type: '',
      errors: {
        name: '',
        type: ''
      }
    }
  }

  componentDidMount(){
    if(this.props.ingredient){
      this.setState({ name: this.props.ingredient.name, type: this.props.ingredient.type });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.ingredient){
      this.setState({ name: nextProps.ingredient.name, type: nextProps.ingredient.type });
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
    const valid = this.validate();
    if(valid){
      const { name, type } = this.state;
      this.props.handleFormSubmit({ name, type });
    }
  }

  validate = () => {
    this.clearErrors();
    let errors = {};
    let isValid = true;

    if(this.state.name === '') {
      errors.name = 'Please enter a name';
      isValid = false;
    }

    else if(this.state.name.length < 2 || this.state.name > 100){
      errors.name = 'Name needs to be between 10 and 100 characters';
      isValid = false;
    }

    if(this.state.type === '') {
      errors.type = 'Please enter a type';
      isValid = false;
    }

    else if(this.state.type.length < 2 || this.state.type > 40){
      errors.type = 'Name needs to be between 10 and 40 characters';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  }

  clearErrors = () => {
    this.setState({ errors: {name: '', type: ''} });
  }

  render(){
    return (
      <IngredientFormDisplay 
        state= { this.state }
        inputChange= { this.handleInputChange }
        formSubmit= { this.handleFormSubmit }
        cancel= { this.props.cancel }
      />
    );
  }
}

export default IngredientForm;