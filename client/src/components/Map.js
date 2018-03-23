import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../css/style.css';

mapboxgl.accessToken =  'pk.eyJ1IjoiZGNoZW5nMDEwNCIsImEiOiJjaXE0MDh2MHQwMG9xZnhtNGg0azVybGxtIn0.7jdNnbpd8kQI3qO1HfSnUg';

class Map extends React.Component {
    // mapContainer = React.createRef();
    state = { geos: {}}
    componentDidMount() {
      this.map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/light-v9',
        zoom : 9,
        center: [ -118.382877, 34.014700]

      });
      this.getGeos();
      this.map.on('load',()=>{
          console.log(this.state.geos);
          this.map.addSource("base_nb",{
              "type": "geojson",
              "data": this.state.geos
          });

          this.map.addLayer({
            "id": "nb-boundary",
            "type": "fill",
            "source": "base_nb",
            "paint": {
                "fill-color": "red",
                "fill-opacity": 0.4
            }
          });
      });



    }

    getGeos=()=>{
        fetch('api/nbs')
        .then(res => res.json())
        .then(data => {
            let results = {};
            results['type'] = "FeatureCollection";
            results["features"] = [];
            data.data.forEach(geo=>{
                let feature = {};
                feature.type = "Feature";
                feature.properties = {"name":geo.name};
                feature.geometry = JSON.parse(geo.st_asgeojson);
                results.features.push(feature);
            })
            this.setState({ geos:results })
        });
    }

    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {
      return (

        <div  ref={el => this.mapContainer = el} />
      )
              
    }
  }

export default Map;
