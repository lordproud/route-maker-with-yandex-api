import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/pointsActions';

class List extends Component {
  render() {
    const { pointsOfRoutes } = this.props.item;
    console.log(pointsOfRoutes);
    return (
      <div className="search-list">
        <ul>
          {pointsOfRoutes.length > 0
            ? pointsOfRoutes.map(({ id, name }) => <li key={id}>{name}</li>)
            : ''}
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
