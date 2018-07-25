import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Map from './components/Map';
import store from './store';
import SearchBar from './components/SearchBar';
import List from './components/List';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Router Maker with Yandex Maps API</h1>
          </header>
          <SearchBar />
          <List />
          <Map />
        </div>
      </Provider>
    );
  }
}

export default App;
