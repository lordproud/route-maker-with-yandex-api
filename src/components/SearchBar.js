import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from '../actions/searchActions';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    this.props.search(this.state.value);
    this.setState({
      value: '',
    });
    e.preventDefault();
  };
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
    // Код ниже заставляет при каждом изменинеи инпута менять список
    // if (this.state.value) {
    //   this.props.search(this.state.value);
    // }
  };
  render() {
    return (
      <div className="App-search-bar">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item,
});

export default connect(
  mapStateToProps,
  { search }
)(SearchBar);
