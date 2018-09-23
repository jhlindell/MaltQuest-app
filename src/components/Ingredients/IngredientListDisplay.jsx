import '../../App.css';
import React from 'react';
import { 
  Button,
  Card, CardFooter, CardHeader,
  InputGroup, InputGroupAddon, Input,  
  Table } from 'reactstrap';
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

  titleText: {
    fontSize: '1.2rem',
  },

  button: {
    backgroundColor: '#dd8b15',
    borderColor: '#dd8b15',
  }
}

const IngredientListDisplay = (props) => {
  return (
    <Card style={styles.list}>
      <CardHeader style={styles.header}>
        <div style={styles.headerRow}>
          <h4>Ingredients</h4>
        </div>
        <div style={styles.headerRow}>
          <div style={{paddingTop: '15px'}}>
            <Pagination         
              activePage={ props.state.activePage }
              itemsCountPerPage={ props.state.itemsPerPage }
              totalItemsCount={ props.ingredientList.total }
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
            style={ styles.button}
            onClick={ ()=> props.history.push('/ingredients/create')}
          >
            New Ingredient
          </Button>
        </div>
      </CardHeader>
      {props.ingredientList.docs ? 
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            { props.ingredientList.docs.map((ingredient) => {
                return <tr key={ingredient._id}>
                <td>{ingredient.name}</td>
                <td>{ingredient.type}</td>               
                <td>
                  <Button
                    color="warning"
                    size="sm"
                    onClick= {()=> props.history.push(`/ingredients/edit/${ingredient._id}`)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    onClick= {()=> props.delete(ingredient._id)}
                  >
                    Delete
                  </Button>
                </td>
                </tr>
              }) 
            }
          </tbody>
        </Table> : <span>Loading...</span>}
      <CardFooter style={ styles.header }>
        <div style={styles.headerRow}> 
            <Pagination              
              activePage={ props.state.activePage }
              itemsCountPerPage={ props.state.itemsPerPage }
              totalItemsCount={ props.ingredientList.total }
              pageRangeDisplayed={ 5 }
              onChange={ props.handlePageChange }
              itemClass='page-item'
              linkClass='page-link link-custom'
              activeLinkClass='active-link'
            />
        </div>
      </CardFooter>
    </Card>
  );
}

export default IngredientListDisplay;