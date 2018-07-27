import React from 'react';
import { connect } from 'react-redux';
import { YMaps, Map } from 'react-yandex-maps';
import { getItems, setMapParams } from '../actions/pointsActions';
import { isEqual } from 'lodash';
class RouteMaker extends React.Component {
  state = {
    center: [0, 0],
    zoom: 0,
  };

  componentWillMount() {
    // init map state
    const { mapParams } = this.props.items;
    this.setState({
      center: mapParams.center,
      zoom: mapParams.zoom,
    });
  }

  componentDidMount() {
    this.updateRoute(this.props.pointsOfRoutes);
  }

  componentWillReceiveProps(nextProps) {
    const { pointsOfRoutes: points } = nextProps.items;
    const { ymaps, map } = this;
    if (!ymaps) return true;
    if (isEqual(points, this.props.items.pointsOfRoutes)) {
      return true;
    }
    // fix on one point (route needs 2 points or greater)
    if (points.length <= 1) {
      map.geoObjects.removeAll();
      if (points.length === 1) {
        const point = points[0];
        const placemark = new ymaps.Placemark(point.pos, {
          balloonContent: point.name,
        });
        map.geoObjects.add(placemark);
      }
    }

    this.updateRoute(points);
  }

  updateRoute = points => {
    const { ymaps } = this;
    if (!ymaps) return;
    const routePoints = points.map(p => ({
      type: 'wayPoint',
      point: p.pos,
      balloon: p.name,
      name: p.name,
    }));
    // #region make route
    ymaps
      .route(routePoints.map(v => v.name), { mapStateAutoApply: true })
      .then(route => {
        const { geoObjects } = this.map;
        geoObjects.removeAll().add(route);
        const { pointsOfRoutes: points } = this.props.items;
        route.getWayPoints().each(o => {
          const index = o.properties.get('index');
          o.properties.set({
            balloonContent: points[index].name,
          });
        });
      });
    // #endregion
  };
  // При изменение карты
  updateMap() {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();
    this.props.setMapParams(center, zoom);
  }

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
  { getItems, setMapParams }
)(RouteMaker);
