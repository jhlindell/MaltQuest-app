import { 
  Button, 
  Card, CardBody, CardFooter, CardHeader, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Label,
  Table
} from 'reactstrap';
import React from 'react';

const styles= {
  mainCard: {
    display: 'flex',
    margin: 'auto',
    cardColumns: '1',
    backgroundColor: 'lightgray',
  },

  errorText: {
    fontSize: '1.0rem',
    color: 'red'
  },

  titleText: {
    fontSize: '1.2rem',
    backgroundColor: '#432a0d',
    color: 'white'
  },

  infoGroup: {
    marginTop: '5px',
    marginBottom: '5px',
    paddingTop: '15px',
    paddingRight: '10px',
    paddingLeft: '10px',
  },

  bodyText: {
    color: '#dd8b15',
    fontWeight: '700',

  },

  button: {
    backgroundColor: 'rgb(153, 187, 40)',
    borderColor: 'rgb(153, 187, 40)',
  },

  footer: {
    backgroundColor: '#432a0d',
    color: 'white'
  }
};

const RecipeFormDisplay = (props) => {
  return (
    <Card style={ styles.mainCard }>
      <Form onSubmit={ props.handleFormSubmit }>
        <CardHeader style={ styles.titleText }>
          <strong>New Recipe</strong>
        </CardHeader>
        <CardBody>
          <Card style={ styles.infoGroup }>
            <FormGroup row>
              <Label for="recipeName" sm={3} style={ styles.bodyText }>Name</Label>
              <Col sm={9}>
                <Input name="name" id="recipeName"
                  type="text"
                  onChange={(e) => { props.handleInputChange(e)} }
                  placeholder="Recipe Name"
                  value={ props.state.name }/> 
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="recipeDescription" sm={3} style={ styles.bodyText }>Description</Label>
              <Col sm={9}>
                <Input name="description" id="recipeDescription"
                  type="textarea"
                  rows="2"
                  onChange={(e) => { props.handleInputChange(e)} }
                  placeholder="Description"
                  value={ props.state.description}/>  
              </Col>    
            </FormGroup>
            <FormGroup row>
              <Label for="recipeStyle" sm={2} style={ styles.bodyText }>Style</Label>
              <Col sm={4}>
                <Input name="style" id="recipeStyle"
                  type="text"
                  onChange={(e) => { props.handleInputChange(e)} }
                  placeholder="Style"
                  value={ props.state.style }/> 
              </Col>
              <Label for="recipeSize" sm={2} style={ styles.bodyText }>Batch Size</Label>
              <Col sm={4}>
                <Input name="batchSize" id="recipeSize"
                  type="text"
                  onChange={(e) => { props.handleInputChange(e)} }
                  placeholder="Batch Size"
                  value={ props.state.batchSize }/> 
              </Col>
            </FormGroup>
          </Card>
          <Card style={ styles.infoGroup }>
            <strong>Ingredients:</strong>
            {props.state.ingredients.length ? <Table className="mt-2" striped bordered>
              <thead>
                <tr>
                  <th>Ingredient Name</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { props.state.ingredients.map((ingredient, index) => {
                  return <tr key={ingredient.name + ingredient.type}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.type}</td>
                    <td>{ingredient.amount}</td>
                    <td>
                      <Button 
                        size="sm"
                        color="danger"
                        onClick={() => props.removeIngredient(index)}
                      >-</Button>
                    </td>
                  </tr>
                })}
              </tbody>
            </Table> : <div className="mt-3"></div>}
            <FormGroup row>
              <Col sm={6}>
                <Input name="newIngredientName"
                  id="newIngredientName"
                  type="text" 
                  onChange={(e) => props.handleInputChange(e)}
                  value={ props.state.newIngredientName } />
              </Col>
              <Col sm={2}>
                <Input name="newIngredientType"
                  type="text" 
                  id="newIngredientType"
                  onChange={(e) => props.handleInputChange(e)}
                  value={ props.state.newIngredientType } />
              </Col>
              <Col sm={2}>
                <Input name="newIngredientAmount"
                  type="text" 
                  id="newIngredientAmount"
                  onChange={(e) => props.handleInputChange(e)}
                  value={ props.state.newIngredientAmount } />  
              </Col>
              <Col sm={2}>
                <Button
                  style={ styles.button }
                  type="button"
                  onClick={()=> props.addIngredient()}>
                  Add
                </Button>
              </Col>
            </FormGroup>
            { props.state.errors.newIngredientName && 
              <div style={styles.errorText}>{ props.state.errors.newIngredientName }</div>}
            { props.state.errors.newIngredientType && 
              <div style={styles.errorText}>{ props.state.errors.newIngredientType }</div>} 
            { props.state.errors.newIngredientAmount && 
              <div style={styles.errorText}>{ props.state.errors.newIngredientAmount }</div>}
          </Card>
          <Card style={ styles.infoGroup }>
            <strong>Instructions:</strong>
            <Table className="mt-2" striped>
              <thead>
                <tr>
                  <td style={{width: '15%', padding: '0px'}}></td>
                  <td style={{width: '70%', padding: '0px'}}></td>
                  <td style={{width: '15%', padding: '0px'}}></td>
                </tr>
              </thead>
              <tbody>
                { props.state.instructions.map((instruction, index) => {
                  return <tr key={ instruction }>
                    <td>{ index + 1 }</td>
                    <td>{ instruction }</td>
                    <td>
                      <Button 
                        color="danger"
                        size="sm"
                        onClick={ () => props.removeInstruction(index) }
                      >-</Button>
                    </td>
                  </tr>
                })}
              </tbody>
            </Table>
            <FormGroup row>
              <Col sm={9}>
                <Input 
                  name='newInstruction' 
                  id='newInstruction'
                  type="text"
                  onChange={ (e) => { props.handleInputChange(e) }}
                  value={ props.state.newInstruction } />
              </Col>
              <Button sm={3}
                style={ styles.button }
                type="button"
                onClick={ ()=> props.addInstruction() }>
                Add Instruction
              </Button>
            </FormGroup>
            { props.state.errors.instruction && 
              <div style={styles.errorText}>{ props.state.errors.instruction }</div>}
          </Card>
        </CardBody>
        <CardFooter style={ styles.footer }>
          <div className="btn-group" style={{ margin: 'auto' }}>
            <Button style={ styles.button } type="submit">
              Submit
            </Button>
            <Button color="secondary" type="button" onClick={()=> props.cancel()}>
              Cancel
            </Button>
          </div>
        </CardFooter>
      </Form>
    </Card>
  );
}

export default RecipeFormDisplay;
