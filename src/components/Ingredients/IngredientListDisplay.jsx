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
    display: 'flex', 
    margin: 'auto', 
    justifyContent: 'space-around',
    alignItems: 'center'
  },
}

const IngredientListDisplay = (props) => {
  return (
    <Card style={styles.list}>
      <CardHeader>
        <div style={styles.header}>
          <strong>Ingredient List</strong>
        </div>
        <div style={styles.header}>
          <div style={{paddingTop: '15px'}}>
            <Pagination              
              activePage={ props.state.activePage }
              itemsCountPerPage={ props.state.itemsPerPage }
              totalItemsCount={ props.ingredientList.total }
              pageRangeDisplayed={ 5 }
              onChange={ props.handlePageChange }
              itemClass='page-item'
              linkClass='page-link'
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
                color="primary"
                type="button"
                onClick={ props.handleSearchSubmit }
              >Search</Button>
            </InputGroupAddon>
          </InputGroup>
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
                </tr>
              }) 
            }
          </tbody>
        </Table> : <span>Loading...</span>}
      <CardFooter>
        <div style={styles.header}> 
            <Pagination              
              activePage={ props.state.activePage }
              itemsCountPerPage={ props.state.itemsPerPage }
              totalItemsCount={ props.ingredientList.total }
              pageRangeDisplayed={ 5 }
              onChange={ props.handlePageChange }
              itemClass='page-item'
              linkClass='page-link'
            />
        </div>
      </CardFooter>
    </Card>
  );
}

export default IngredientListDisplay;