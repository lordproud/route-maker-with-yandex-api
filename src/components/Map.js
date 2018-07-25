import React from 'react';
import { connect } from 'react-redux';
import { YMaps, Map } from 'react-yandex-maps';
import { getItems } from '../actions/pointsActions';

class RouteMaker extends React.Component {
  state = {
    center: [0, 0],
    zoom: 0,
  };

  componentWillMount() {
    const { mapParams } = this.props.items;
    this.setState({
      center: mapParams.center,
      zoom: mapParams.zoom,
    });
  }

  componentDidMount() {
    console.log('did mount');
    // this.updateRoute(points);
  }
  updateRoute = points => {
    const { ymaps, map } = this;
    if (!map) return;
    ymaps.route(points).then(route => {
      map.geoObjects.add(route);
    });
  };
  // При изменение карты
  updateMap = () => {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();
  };

  render() {
    const { state } = this;
    return (
      <div className="App-map">
        <YMaps onApiAvaliable={ymaps => (this.ymaps = ymaps)}>
          <Map
            instanceRef={ref => (this.map = ref)}
            state={state}
            width="100%"
            height={500}
            onActionEnd={e => this.updateMap(e)}
            onActionBreak={e => this.updateMap(e)}
          />
        </YMaps>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.points,
});

export default connect(
  mapStateToProps,
  { getItems }
)(RouteMaker);
