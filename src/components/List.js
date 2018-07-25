import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/pointsActions';

class List extends Component {
  render() {
    const { items } = this.props.item;
    return (
      <div className="search-list">
        <ul>
          {/* {items.length > 0
            ? items.map(({ id, name }) => <li key={id}>{name}</li>)
            : ''} */}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.points,
});

export default connect(
  mapStateToProps,
  { getItems }
)(List);
