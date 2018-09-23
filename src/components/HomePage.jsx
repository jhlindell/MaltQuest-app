import React, { Component } from "react";
import { Button, Jumbotron } from 'reactstrap';
import Carousel from './Carousel';

const styles = {
  pageStyle: {
    display: 'flex',
    margin: 'auto'
  },

  buttonRow: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  button: {
    backgroundColor: '#dd8b15',
    borderColor: '#dd8b15',
  },
}

class HomePage extends Component{
  render(){
    return ( 
      <div style={ styles.pageStyle }>
        <Jumbotron>
          <h1 className="display-5">Welcome to MaltQuest!</h1>
          <hr />
          <p className="lead">A website for keeping track of homebrewing recipes and ingredients</p>
          <Carousel />
          <hr/>
          <div className="lead" style={ styles.buttonRow }>
            <Button
              style={ styles.button }
              onClick={()=> this.props.history.push('/recipes')}
            >
              Recipes
            </Button>
            <Button
              style={ styles.button }
              onClick={()=> this.props.history.push('/ingredients')}
            >
              Ingredients
            </Button>
          </div>
        </Jumbotron>       
      </div>
    )
  }
}

export default HomePage;