import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../css/style.css';
import {color} from '../palette.json';

mapboxgl.accessToken =  'pk.eyJ1IjoiZGNoZW5nMDEwNCIsImEiOiJjaXE0MDh2MHQwMG9xZnhtNGg0azVybGxtIn0.7jdNnbpd8kQI3qO1HfSnUg';
console.log(color);
class Map extends React.Component {
    // mapContainer = React.createRef();
    state = {
        geos: {},
        year : 2014
    };
    componentDidMount() {
      this.map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/light-v9',
        zoom : 9,
        center: [ -118.382877, 34.014700]

      });

      this.getAllUsage();
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
                "fill-outline-color": "#e1cdb5",
                'fill-opacity': 1,
                "fill-color": "#888888"
            },
            "filter":  ["all",['==','year',this.state.year],['!=','usage',-9999]] 
          });

         this.setFill(this.state.year);

      });



    }

    getAllUsage=()=>{
        fetch('api/nbs')
        .then(res => res.json())
        .then(data => {
            let results = {};
            results['type'] = "FeatureCollection";
            results["features"] = [];
            data.data.forEach(geo=>{
                let feature = {};
                feature.type = "Feature";
                feature.properties = {"name":geo.name,"id":geo.id,"usage":geo.usage,"sqft":geo.sqft,"usage_med":geo.usage_med,"usage_med_sqft":geo.usage_med_sqft,"year":geo.year,"data_load_period_id":geo.data_load_period_id};
                feature.geometry = JSON.parse(geo.st_asgeojson);
                results.features.push(feature);
            })
            this.setState({ geos:results })
        });
    }

    setFill =(year) =>{
        this.map.setPaintProperty("nb-boundary",'fill-color',{
            "property": "usage",
            "stops": [
              [353499,"#edf8fb"],
              [974104,"#b2e2e2"],
              [1895798,"#66c2a4"],
              [3337788,"#2ca25f"],
              [6053778,"#006d2c"]
            ]
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
