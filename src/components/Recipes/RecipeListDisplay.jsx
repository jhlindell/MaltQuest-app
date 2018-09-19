import React from 'react';
import { 
  Card, CardFooter, CardHeader, 
  Table } from 'reactstrap';

const styles = {
  list: {
    display: 'flex',
    margin: 'auto',
    width: '60%'
  },
  
  header: {
    display: 'flex', 
    margin: 'auto', 
    justifyContent: 'space-around',
    alignItems: 'center'
  },
}

const RecipeListDisplay = (props) => {
  return (
    <Card style={styles.list}>
      <CardHeader>
        <div style={styles.header}>
          <strong>Ingredient List</strong>
        </div>
      </CardHeader>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Style</th>
          </tr>
        </thead>
        <tbody>
          { props.recipeList.map((recipe) => {
              return <tr key={recipe.name + recipe.type}>
              <td>{recipe.name}</td>
              <td>{recipe.style}</td>
              </tr>
            }) 
          }
        </tbody>
      </Table>
      <CardFooter>
        Page List
      </CardFooter>
    </Card>
  );
}

export default RecipeListDisplay;