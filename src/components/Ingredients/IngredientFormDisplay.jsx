import React from 'react';
import { Button, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label} from 'reactstrap';

const styles = {
  header: {
    backgroundColor: '#432a0d',
    color: 'white'
  },

  button: {
    backgroundColor: '#dd8b15',
    borderColor: '#dd8b15',
  }
}

const IngredientFormDisplay = (props) => {
  return (
    <Form onSubmit={ props.formSubmit }>
        <CardHeader style={ styles.header }>
          <h4>Add new ingredient</h4>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label for="itemName">Name</Label>
            <Input name="name" id="itemName"
              className={"" + props.state.errors.name ? "is-invalid": ""}
              type="text"
              onChange={(e) => { props.inputChange(e)} }
              placeholder="Name"
              value={ props.state.name }/>
            { props.state.errors.name && 
              <div>
                { props.state.errors.name }
              </div>}
          </FormGroup>
          <FormGroup>
            <Label for="itemType">Type</Label>
            <Input name="type" id="itemType"
              className={"" + props.state.errors.type ? "is-invalid": ""}
              type="text"
              onChange={(e) => { props.inputChange(e)} }
              placeholder="Type"
              value={ props.state.type }/>
            { props.state.errors.type && 
              <div>
                { props.state.errors.type }
              </div>}
          </FormGroup>
        </CardBody>
        <CardFooter style={ styles.header }>
          <div className="btn-group" >
            <Button 
              style={ styles.button } 
              type="submit"
            >
              Submit
            </Button>
            <Button color="secondary" onClick={()=> props.cancel()}>
              Cancel
            </Button>
          </div>
        </CardFooter>
    </Form>
  );
};

export default IngredientFormDisplay;