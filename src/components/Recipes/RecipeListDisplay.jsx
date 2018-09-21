import '../../App.css';
import React from 'react';
import { 
  Card, CardFooter, CardHeader,
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
}

const RecipeListDisplay = (props) => {
  return (
    <Card style={styles.list}>
      <CardHeader style={styles.header}>
        <div style={styles.headerRow}>
          <strong>Recipe List</strong>
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
                return <tr key={recipe.name + recipe.type}>
                <td>{recipe.name}</td>
                <td>{recipe.style}</td>
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
            totalItemsCount={ props.recipeList.total }
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

export default RecipeListDisplay;