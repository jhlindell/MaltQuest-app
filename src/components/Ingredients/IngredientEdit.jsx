import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { editIngredient, getIngredientById, clearSingleIngredient } from '../../actions';
import { Card } from 'reactstrap';
import IngredientForm from './IngredientFormContainer';

const cardStyle = {
  display: 'flex',
  margin: 'auto',
  minWidth: '50%',
};

class IngredientEdit extends Component {
  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getIngredientById(id, this.editFailure);
  }

  editSuccess = () => {
    this.props.clearSingleIngredient();
    this.props.history.push('/ingredients');
  }

  editFailure = () => {
    this.props.clearSingleIngredient();
    this.props.history.push('/ingredients');
  }

  editIngredient = (item) => {
    const { name, type } = item;
    this.props.editIngredient(this.props.match.params.id, { name, type }, this.editSuccess);
  }

  cancel = () => {
    this.props.history.push('/ingredients');
  }

  render(){
    return(
      <Card style={cardStyle}>    
        <IngredientForm 
          handleFormSubmit= { this.editIngredient }
          ingredient= { this.props.ingredient }
          cancel= { this.cancel }
          { ...this.props }
        />     
      </Card>
    );
  }
}

function mapStateToProps(state){
  return { ingredient: state.ingredient };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ editIngredient, getIngredientById, clearSingleIngredient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientEdit);