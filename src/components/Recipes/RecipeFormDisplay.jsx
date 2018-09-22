import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { 
  Button, 
  Card, CardBody, CardFooter, CardHeader, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Modal,
  Label,
  Table
} from 'reactstrap';
import React, { Component } from 'react';
import IngredientForm from '../Ingredients/IngredientFormContainer';

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

  infoError: {
    fontSize: '1.0rem',
    color: 'red',
    marginTop: '10px',
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
    backgroundColor: '#dd8b15',
    borderColor: '#dd8b15',
  },

  footer: {
    backgroundColor: '#432a0d',
    color: 'white'
  },

  modalStyle: {
    display: 'flex',
    width: '100%',
    textAlign: 'center'
  },
};

class RecipeFormDisplay extends Component {
  clearTypeahead(){
    this.typeahead.getInstance().clear();
  }

  render(){
    return (
      <Card style={ styles.mainCard }>
        <Form onSubmit={ this.props.handleFormSubmit }>
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
                    onChange={(e) => { this.props.handleInputChange(e)} }
                    placeholder="Recipe Name"
                    value={ this.props.state.name }/> 
                  { this.props.state.errors.name && 
                    <div style={ styles.infoError }>{ this.props.state.errors.name }</div> }
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="recipeDescription" sm={3} style={ styles.bodyText }>Description</Label>
                <Col sm={9}>
                  <Input name="description" id="recipeDescription"
                    type="textarea"
                    rows="2"
                    onChange={(e) => { this.props.handleInputChange(e)} }
                    placeholder="Description"
                    value={ this.props.state.description}/>
                  { this.props.state.errors.description && 
                    <div style={ styles.infoError }>{ this.props.state.errors.description }</div> }  
                </Col>    
              </FormGroup>
              <FormGroup row>
                <Label for="recipeStyle" sm={2} style={ styles.bodyText }>Style</Label>
                <Col sm={4}>
                  <Input name="style" id="recipeStyle"
                    type="text"
                    onChange={(e) => { this.props.handleInputChange(e)} }
                    placeholder="Style"
                    value={ this.props.state.style }/>
                  { this.props.state.errors.style && 
                    <div style={ styles.infoError }>{ this.props.state.errors.style }</div> } 
                </Col>
                <Label for="recipeSize" sm={2} style={ styles.bodyText }>Batch Size</Label>
                <Col sm={4}>
                  <Input name="batchSize" id="recipeSize"
                    type="text"
                    onChange={(e) => { this.props.handleInputChange(e)} }
                    placeholder="Batch Size"
                    value={ this.props.state.batchSize }/> 
                  { this.props.state.errors.batchSize && 
                    <div style={ styles.infoError }>{ this.props.state.errors.batchSize }</div> }
                </Col>
              </FormGroup>
            </Card>
            <Card style={ styles.infoGroup }>
              <strong>Ingredients:</strong>
              { this.props.state.ingredients.length ? <Table className="mt-2" striped bordered>
                <thead>
                  <tr>
                    <th>Ingredient Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { this.props.state.ingredients.map((ingredient, index) => {
                    return <tr key={ingredient.name + ingredient.type}>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.type}</td>
                      <td>{ingredient.amount}</td>
                      <td>
                        <Button 
                          size="sm"
                          color="danger"
                          onClick={() => this.props.removeIngredient(index)}
                        >-</Button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </Table> : <div className="mt-3"></div>}
              <FormGroup row>
                <Col sm={6}>
                  <AsyncTypeahead 
                    name="newIngredientName"
                    id="newIngredientName"
                    isLoading={ this.props.state.isLoading }
                    labelKey="name"
                    onSearch={query => this.props.onItemSearch(query)}
                    onChange={(item) => this.props.handleATAchange(item)}
                    onInputChange={(input) => this.props.handleATAInputChange(input)}
                    selected={ this.props.state.selected }
                    value={ this.props.state.newIngredientName }
                    options={ this.props.state.options }
                    ref={(typeahead) => this.typeahead = typeahead}
                  />
                </Col>
                <Col sm={2}>
                  <Input name="newIngredientType"
                    type="text" 
                    id="newIngredientType"
                    placeholder="Type"
                    onChange={(e) => this.props.handleInputChange(e)}
                    value={ this.props.state.newIngredientType } />
                </Col>
                <Col sm={2}>
                  <Input name="newIngredientAmount"
                    type="text" 
                    id="newIngredientAmount"
                    placeholder="Amount"
                    onChange={(e) => this.props.handleInputChange(e)}
                    value={ this.props.state.newIngredientAmount } />  
                </Col>
                <Col sm={2}>
                  <Button
                    style={ styles.button }
                    type="button"
                    onClick={()=> this.props.addIngredient()}>
                    Add
                  </Button>
                </Col>
              </FormGroup>
              { this.props.state.errors.newIngredientName && 
                <div style={styles.errorText}>{ this.props.state.errors.newIngredientName }</div>}
              { this.props.state.errors.newIngredientType && 
                <div style={styles.errorText}>{ this.props.state.errors.newIngredientType }</div>} 
              { this.props.state.errors.newIngredientAmount && 
                <div style={styles.errorText}>{ this.props.state.errors.newIngredientAmount }</div>}
              { this.props.state.errors.ingredients && 
                <div className="mb-2" style={styles.errorText}>{ this.props.state.errors.ingredients }</div>}
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
                  { this.props.state.instructions.map((instruction, index) => {
                    return <tr key={ instruction }>
                      <td>{ index + 1 }</td>
                      <td>{ instruction }</td>
                      <td>
                        <Button 
                          color="danger"
                          size="sm"
                          onClick={ () => this.props.removeInstruction(index) }
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
                    onChange={ (e) => { this.props.handleInputChange(e) }}
                    value={ this.props.state.newInstruction } />
                </Col>
                <Button sm={3}
                  style={ styles.button }
                  type="button"
                  onClick={ ()=> this.props.addInstruction() }>
                  Add Instruction
                </Button>
              </FormGroup>
              { this.props.state.errors.instruction && 
                <div className="mb-2" style={styles.errorText}>{ this.props.state.errors.instruction }</div>}
            </Card>
          </CardBody>
          <CardFooter style={ styles.footer }>
            <div className="btn-group" style={{ margin: 'auto' }}>
              <Button style={ styles.button } type="submit">
                Submit
              </Button>
              <Button color="secondary" type="button" onClick={()=> this.props.cancel()}>
                Cancel
              </Button>
            </div>
          </CardFooter>
        </Form>
        <Modal isOpen={ this.props.state.modal } toggle={ this.props.state.modalToggle } className="modal-dialog-centered">
          <Card style={ styles.modalStyle }>
            <IngredientForm
              ingredient = {{ name: this.props.state.newIngredientName, 
                type: this.props.state.newIngredientType }}
              handleFormSubmit={ this.props.handleIngModalReturn}
              cancel={ this.props.modalToggle}
            />         
          </Card>
        </Modal>
      </Card>
    );
  }
}

export default RecipeFormDisplay;
