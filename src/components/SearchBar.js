import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from '../actions/pointsActions';
import Autocomplete from 'react-autocomplete';
class SearchBar extends Component {
  state = {
    value: '',
    findItems: [],
  };

  handleSubmit = e => {
    const { value } = this.state;
    // if (value) {
    //   this.props.search(value);
    // }
    this.setState({
      value: '',
    });
    e.preventDefault();
  };
  handleChange = (e, value) => {
    this.setState({ value });
    if (value) {
      this.props.search(value);
    }
  };
  //#region kenneth
  render() {
    const { items } = this.props.item;
    return (
      <div className="App-search-bar">
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            items={items}
            getItemValue={item => item.name}
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: highlighted ? '#eee' : 'transparent',
                }}
              >
                {item.name}
              </div>
            )}
            value={this.state.value}
            onChange={this.handleChange}
            onSelect={value => this.setState({ value })}
          />
        </form>
      </div>
    );
  }
}
//#endregion
const mapStateToProps = state => ({
  item: state.points,
});

export default connect(
  mapStateToProps,
  { search }
)(SearchBar);
