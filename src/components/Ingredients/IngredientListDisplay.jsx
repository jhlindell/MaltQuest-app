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

const IngredientListDisplay = (props) => {
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
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          { props.ingredientList.map((ingredient) => {
              return <tr key={ingredient.name + ingredient.type}>
              <td>{ingredient.name}</td>
              <td>{ingredient.type}</td>
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

export default IngredientListDisplay;