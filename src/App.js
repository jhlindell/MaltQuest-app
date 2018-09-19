import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/nav/Footer';
import Navbar from './components/nav/Navbar';

const styles = {
  app: {
    textAlign: 'center',
    minHeight: '100vh',
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    display: 'flex',
    flexDirection: 'column'
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  flex0: {
    flex: 0
  },

  flex1: {
    display: 'flex',
    flex: '1 1 100%',
  },

  autoMargin: {
    display: 'flex',
    margin: 'auto'
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <div style={ styles.app }>
          <div style={ styles.flex0 }>
            <Navbar />
          </div>
          <div style={ styles.flex1 } id="mainBlock">
            <h1 style={ styles.autoMargin }>Main Body</h1>
          </div>
          <div style={ styles.flex0 }>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
