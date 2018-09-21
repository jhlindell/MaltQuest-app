import React from 'react';
import { 
  Button, 
  Card, CardBody, CardFooter, CardHeader, 
  Col, Row, Table 
} from 'reactstrap';
import Beermug from '../../beermug.jpg';

const styles = {
  outerDiv: {
    display: 'flex',
    width: '100%',
  },

  button: {
    margin: 'auto'
  },

  card: {
    margin: 'auto',
    maxWidth: '60%',
    fontSize: '0.85rem'
  },

  header: {
    fontSize: '1.2rem',
    backgroundColor: '#432a0d',
    color: 'white'
  },

  footer: {
    backgroundColor: '#432a0d',
    color: 'white'
  },

  picStyle: {
    height: '160px',
    margin: 'auto',
    padding: '20px',
  },

  centering: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  },

  backButton: {
    backgroundColor: '#dd8b15',
    borderColor: '#dd8b15',
  }
};

const RecipeDetailDisplay = (props) => {
  return (
    <div style={ styles.outerDiv }>
      { props.recipe ? 
        <Card style={ styles.card }>
          <CardHeader style={styles.header}>
            <strong>{ props.recipe.name }</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="9" style={styles.centering}>             
                <p><strong>Description:</strong></p>
                <p>{ props.recipe.description }</p>
                <Row>
                  <Col xs="6">
                    <strong>Style: </strong>{ props.recipe.style }
                  </Col>
                  <Col xs="6">
                    <strong>Batch Size: </strong>{ props.recipe.batchSize }
                  </Col>
                </Row>
              </Col>
              <Col xs="3">
                <img src={ Beermug } style={styles.picStyle} alt="cocktail"/>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col xs="6">
                <p><strong>Ingredients:</strong></p>
                <Table>
                  <tbody>
                    { props.recipe ? 
                      props.recipe.ingredients.map((ingredient) => {
                        return <tr key={ ingredient._id }>
                          <td>{ ingredient.amount }</td>
                          <td>{ ingredient.name }</td>
                          <td>{ ingredient.type }</td>
                      </tr> 
                      }) : <span>Loading...</span>
                    }   
                  </tbody>   
                </Table>
              </Col>
              <Col xs="6" style={styles.centering}>
                <p><strong>Instructions:</strong></p>
                <ol>
                  { props.recipe.instructions.map((instruction) => {
                    return <li key={instruction}>{instruction}</li>
                  })}
                </ol>
              </Col>
            </Row>
          </CardBody>
          <CardFooter style={ styles.footer }>
            <div className="btn-group" style={ styles.button }>
              <Button
                style={ styles.backButton }
                type="button"
                onClick={()=> props.history.push('/recipes')}>
                Go Back
              </Button>
              { props.authenticated &&<Button 
                color="warning"
                type="button"
                onClick={()=> props.history.push(`/recipes/edit/${ props.match.params.id}`)}>
                Edit
                </Button>}
              <Button 
                color="danger" 
                type="button"
                onClick={()=> props.deleteItem()}>
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card> :
        <div>
          Loading...
        </div>
      }
    </div>
  );
}

export default RecipeDetailDisplay;