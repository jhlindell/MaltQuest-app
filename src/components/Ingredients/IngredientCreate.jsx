import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { createIngredient, clearNewIngredient } from '../../actions';
import { Card } from 'reactstrap';
import IngredientForm from './IngredientFormContainer';

const cardStyle = {
  display: 'flex',
  margin: 'auto',
  cardColumns: '1'
};

class IngredientCreate extends Component {
  createSuccess = () => {
    this.props.clearNewIngredient();
    this.props.history.push('/ingredients');
  }

  createIngredient = (item) => {
      const { name, type } = item;
      this.props.createIngredient({ name, type }, this.createSuccess);
  }

  cancel = () => {
    this.props.history.push('/ingredients');
  }

  render(){
    return(
      <Card style={cardStyle}>    
        <IngredientForm 
          handleFormSubmit= { this.createIngredient }
          cancel= { this.cancel }
          { ...this.props }
        />     
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createIngredient, clearNewIngredient }, dispatch);
}

export default connect(null, mapDispatchToProps)(IngredientCreate);