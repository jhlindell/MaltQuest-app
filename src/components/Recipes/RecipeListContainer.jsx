import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import RecipeListDisplay from './RecipeListDisplay';
import { getRecipeList, clearRecipeList} from '../../actions';

class RecipeListContainer extends Component {
  componentDidMount(){
    this.props.getRecipeList();
  }
  render(){
    return (
      <RecipeListDisplay 
        recipeList={this.props.recipeList}
      />
    );
  }
}

function mapStateToProps(state){
  return { recipeList: state.recipeList}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeList, clearRecipeList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListContainer);