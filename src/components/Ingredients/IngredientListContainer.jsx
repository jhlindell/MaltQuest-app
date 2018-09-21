import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import IngredientListDisplay from './IngredientListDisplay';
import { getIngredientList, clearIngredientList } from '../../actions';

class IngredientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 20,
      searchBox: '',
    };
  }

  componentDidMount(){
    this.props.getIngredientList(this.state.activePage, this.state.itemsPerPage);
  }

  componentWillUnmount(){
    this.props.clearIngredientList();
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.props.getIngredientList(this.state.activePage, this.state.itemsPerPage, this.state.searchBox);
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSearchSubmit = (event) => {
    this.props.getIngredientList(this.state.activePage, this.state.itemsPerPage, this.state.searchBox)
  }

  render(){
    return (
      <IngredientListDisplay 
        ingredientList={ this.props.ingredientList }
        state={ this.state }
        handlePageChange = { this.handlePageChange }
        handleInputChange= { this.handleInputChange }
        handleSearchSubmit= { this.handleSearchSubmit }
        { ...this.props }
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

export default connect(mapStateToProps, mapDispatchToProps)(IngredientList);