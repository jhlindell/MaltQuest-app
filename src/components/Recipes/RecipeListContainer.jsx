import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import RecipeListDisplay from './RecipeListDisplay';
import { getRecipeList, clearRecipeList} from '../../actions';

class RecipeListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 20,
    };
  }

  componentDidMount(){
    this.props.getRecipeList(this.state.activePage, this.state.itemsPerPage);
  }

  componentWillUnmount(){
    this.props.clearRecipeList();
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.props.getRecipeList(this.state.activePage, this.state.itemsPerPage);
    });
  }

  render(){
    return (
      <RecipeListDisplay 
        recipeList={this.props.recipeList}
        state={ this.state }
        handlePageChange = { this.handlePageChange }
        { ...this.props }
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