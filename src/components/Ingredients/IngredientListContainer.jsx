import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import IngredientListDisplay from './IngredientListDisplay';
import { getIngredientList, clearIngredientList } from '../../actions';

class IngredientListContainer extends Component {
  componentDidMount(){
    this.props.getIngredientList();
  }

  componentWillUnmount(){
    this.props.clearIngredientList();
  }

  render(){
    return (
      <IngredientListDisplay 
        ingredientList={ this.props.ingredientList }
      />
    );
  }
}

function mapStateToProps(state){
  return { ingredientList: state.ingredientList}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getIngredientList, clearIngredientList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientListContainer);