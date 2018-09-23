import '../../App.css';
import React from 'react';
import { 
  Button,
  Card, CardFooter, CardHeader,
  InputGroup, InputGroupAddon, Input,  
  Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";


const styles = {
  list: {
    display: 'flex',
    margin: 'auto',
    width: '60%',
    marginTop: '20px',
    marginBottom: '20px'
  },

  header: {
    backgroundColor: '#432a0d',
    color: 'white'
  },
  
  headerRow: {
    display: 'flex', 
    margin: 'auto', 
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  button: {
    backgroundColor: '#dd8b15',
    borderColor: '#dd8b15',
  },
}

const RecipeListDisplay = (props) => {
  return (
    <Card style={styles.list}>
      <CardHeader style={styles.header}>
        <div style={styles.headerRow}>
          <h4>Recipes</h4>
        </div>
        <div style={styles.headerRow}>
          <div style={{paddingTop: '15px'}}>
            <Pagination         
              activePage={ props.state.activePage }
              itemsCountPerPage={ props.state.itemsPerPage }
              totalItemsCount={ props.recipeList.total }
              pageRangeDisplayed={ 5 }
              onChange={ props.handlePageChange }
              itemClass='page-item'
              linkClass='page-link link-custom'
              activeLinkClass='active-link'
            />
          </div>
          <InputGroup className="ml-2">
            <Input 
              name="searchBox" 
              id="searchBox" 
              onChange={ props.handleInputChange }
              value={ props.state.searchBox }
            />
            <InputGroupAddon addonType="append">
              <Button 
                style={ styles.button }
                onClick={ props.handleSearchSubmit }
              >Search</Button>
            </InputGroupAddon>
          </InputGroup>
          <Button 
            className="ml-2"
            style={ styles.button }
            onClick={()=> props.history.push('/recipes/create')}>
            Add Recipe
          </Button>
        </div>
      </CardHeader>
      { props.recipeList.docs ? 
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Style</th>
            </tr>
          </thead>
          <tbody>
            { props.recipeList.docs.map((recipe) => {
                const linkUrl = `/recipes/${ recipe._id }`;
                return <tr key={recipe._id}>
                <td><Link to={linkUrl}>{recipe.name}</Link></td>
                <td>{recipe.style}</td>
                </tr>
              }) 
            }
          </tbody>
        </Table> : <span>Loading...</span>}
      <CardFooter style={ styles.header }>
        <div style={styles.headerRow}> 
          <div style={{paddingTop: '15px'}}>
            <Pagination              
              activePage={ props.state.activePage }
              itemsCountPerPage={ props.state.itemsPerPage }
              totalItemsCount={ props.recipeList.total }
              pageRangeDisplayed={ 5 }
              onChange={ props.handlePageChange }
              itemClass='page-item'
              linkClass='page-link link-custom'
              activeLinkClass='active-link'
            />
          </div>
          <Button 
            style={ styles.button }
            onClick={()=> props.history.push('/recipes/create')}>
            Add Recipe
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default RecipeListDisplay;