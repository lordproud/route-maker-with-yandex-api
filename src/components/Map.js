import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';

const mapState = { center: [55.76, 37.64], zoom: 10 };
const points = [[55.76, 37.64], [55.76, 31.64]];
class RouteMaker extends React.Component {
  handleClick = () => {
    const { ymaps, map } = this;
    ymaps.route(points).then(route => {
      map.geoObjects.add(route);
    });
  };
  render() {
    return (
      <div className="App-map">
        <YMaps onApiAvaliable={ymaps => (this.ymaps = ymaps)}>
          <Map
            instanceRef={ref => (this.map = ref)}
            state={mapState}
            width="100%"
            height={500}
          />
        </YMaps>
        <button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}

export default RouteMaker;
