import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store'
import Entry from './Entry';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Entry />
      </Provider>
    );
  }
}

export default App;