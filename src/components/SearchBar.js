import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search, addPoint } from '../actions/pointsActions';
import Autocomplete from 'react-autocomplete';
class SearchBar extends Component {
  state = {
    value: '',
    currentPoint: {},
  };

  handleSubmit = e => {
    const { items } = this.props.item;
    const { value } = this.state;
    const points = items.filter((val, i) => val.name === value);
    const point = points.length === 1 ? points[0] : undefined;
    if (point) {
      this.props.addPoint(point);
    }
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
  { search, addPoint }
)(SearchBar);
