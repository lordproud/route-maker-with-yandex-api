import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/searchActions';

class List extends Component {
  render() {
    const { items } = this.props.item;
    return (
      <div className="search-list">
        <ul>
          {items.length > 0
            ? items.map(({ id, name }) => <li key={id}>{name}</li>)
            : ''}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(
  mapStateToProps,
  { getItems }
)(List);
