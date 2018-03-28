import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../css/style.css';
import {color} from '../palette.json';
import Legend from './Legend';
import PanelPart from './PanelPart';
mapboxgl.accessToken =  'pk.eyJ1IjoiZGNoZW5nMDEwNCIsImEiOiJjaXE0MDh2MHQwMG9xZnhtNGg0azVybGxtIn0.7jdNnbpd8kQI3qO1HfSnUg';

class Map extends React.Component {
    // mapContainer = React.createRef();
    panelContainer = React.createRef();
    state = {
        geos: {},
        year : 2014,
        barDisplay: false,
        allData:{},
        chartData : 
        {
            labels: ['2011','2012','2013','2014','2015','2016'],
            datasets: []
        },
        options:{
            scales: {
              xAxes: [{ stacked: true }],
              yAxes: [{ stacked: true }]
        },
        responsive: true//,
            // tooltips:{
            //   callbacks: {
            //     label: function(tooltipItems, data) {
            //         //return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' €';
            //         console.log(tooltipItems);
            //     }
            // }
            //}
        }
    };

    updateYear =(year)=>{
        this.setState({year:year});
    }

    updateBar =(display)=>{
        this.setState({barDisplay:display});
    }
    

    componentWillMount(){
        this.getAllUsage().then(data => {
            let results = {};
            results['type'] = "FeatureCollection";
            results["features"] = [];
            data.data.forEach(geo=>{
                let feature = {};
                feature.type = "Feature";
                //need to convert json string to int, otherwise the legend wont work
                feature.properties = {"name":geo.name,"id":geo.id,"usage":parseInt(geo.usage_int),"sqft":parseInt(geo.sqft),"usage_med":parseInt(geo.usage_med),"usage_med_sqft":parseInt(geo.usage_med_sqft),"year":geo.year,"data_load_period_id":geo.data_load_period_id};
                feature.geometry = JSON.parse(geo.st_asgeojson);
                results.features.push(feature);
            })
            this.setState({ geos:results })
        });
    }

    componentDidMount() {

        this.getAllData();
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v9',
            zoom : 9,
            center: [ -118.382877, 34.014700]

          });

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
                'fill-opacity': 1
            },
             "filter":  ["all",['==','year',this.state.year],['!=','usage',-9999]] 
          });    
            this.setFill(this.state.year);

            this.map.on('click',(e)=>{
                const features = this.map.queryRenderedFeatures(e.point,{layers:['nb-boundary']});
                console.log(this.state.allData);
                if (features.length>0){
                    this.updateBar(true);
                    //this.panelRef.current.style["grid-row"]="12/19";
                    // const year = features[0].properties.year;
                    const id = features[0].properties.id;
                    const usetypes = ["commercial","institutional","other","industrial","res","mixed_use"];
                    const years = [2011,2012,2013,2014,2015];
                    let tempData = {"commercial":[],"institutional":[],"other":[],"industrial":[],"res":[],"mixed_use":[]};
                    let colors={"commercial":'#7fc97f',"institutional":'#beaed4',"other":'#fdc086',"industrial":'#ffff99',"res":'#386cb0',"mixed_use":'#f0027f'};
                    usetypes.forEach((usetype)=>{
                        years.forEach((year)=>{
                        this.state.allData.features.forEach((feature)=>{
                            if (feature.properties.id== id & feature.properties.year == year & feature.properties.usetype == usetype & ![-7777,-8888,-9999].includes(feature.properties.usage)){
                            let usage;
                            usage = feature.properties.usage;
                            tempData[usetype].push(usage);          
                            }
                        })
                        })
                    })
                    let datasets = [];
                    Object.keys(tempData).forEach(key=>{
                        //let color = (tempData[key]===100000)?'#000000':colors[key];
                        const dataset = {
                          label: key,
                          data:tempData[key],
                          backgroundColor: colors[key]
                        }
                        datasets.push(dataset)
                    })
                    const newData = {...this.state.chartData};
                    newData.datasets = datasets;
                    this.setState({chartData:newData});
                }
            });
        });
    }

    componentDidUpdate() {
        const filter = ["all",['==','year',this.state.year],['!=','USAGE_int',-9999]];    
        if (this.map.getLayer("nb-boundary")){
            this.map.setFilter('nb-boundary',filter);
            this.map.setPaintProperty("nb-boundary",'fill-color',color[this.state.year]);
        }

      }

    getAllUsage=()=>{
        return fetch('api/nbs')
        .then(res => res.json())
        // .then(data => {
        //     let results = {};
        //     results['type'] = "FeatureCollection";
        //     results["features"] = [];
        //     data.data.forEach(geo=>{
        //         let feature = {};
        //         feature.type = "Feature";
        //         //need to convert json string to int, otherwise the legend wont work
        //         feature.properties = {"name":geo.name,"id":geo.id,"usage":parseInt(geo.usage_int),"sqft":parseInt(geo.sqft),"usage_med":parseInt(geo.usage_med),"usage_med_sqft":parseInt(geo.usage_med_sqft),"year":geo.year,"data_load_period_id":geo.data_load_period_id};
        //         feature.geometry = JSON.parse(geo.st_asgeojson);
        //         results.features.push(feature);
        //     })
        //     this.setState({ geos:results })
        // });
    }

    getAllData=()=>{
        fetch('api/all')
        .then(res => res.json())
        .then(data => {
            let results = {};
            results["features"] = [];
            data.data.forEach(geo=>{
                let feature = {};
                feature.properties = {"name":geo.name,"id":geo.id,"usetype":geo.usetype,"usage":parseInt(geo.usage_int),"sqft":parseInt(geo.sqft),"usage_med":parseInt(geo.usage_med),"usage_med_sqft":parseInt(geo.usage_med_sqft),"year":geo.year,"data_load_period_id":geo.data_load_period_id};
                results.features.push(feature);
            })
            this.setState({ allData:results })
        });
    }
    setFill =(year) =>{
        this.map.setPaintProperty("nb-boundary",'fill-color',color[this.state.year]);
    }
    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {
      return (

        <div  ref={el => this.mapContainer = el} >
            <Legend year ={this.state.year} updateYear={this.updateYear}/> 
            <PanelPart barDisplay={this.state.barDisplay} updateBar={this.updateBar} ref={this.panelContainer} chartData={this.state.chartData} options={this.state.options}/>
        </div>
      )
              
    }
  }

export default Map;
