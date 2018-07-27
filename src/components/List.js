import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, deletePoint } from '../actions/pointsActions';

class List extends Component {
  handleClick = id => f => this.props.deletePoint(id);
  render() {
    const { pointsOfRoutes } = this.props.item;
    return (
      <div className="search-list">
        <ul>
          {pointsOfRoutes.length > 0
            ? pointsOfRoutes.map(({ id, name }) => (
                <li key={id}>
                  {name}
                  <button onClick={this.handleClick(id)}>X</button>
                </li>
              ))
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
  { getItems, deletePoint }
)(List);
