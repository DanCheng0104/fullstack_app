import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../css/style.css';
import {color} from '../palette.json';
import Legend from './Legend';
import PanelPart from './PanelPart';
import Bar from './Bar';
import Loading from './Loading';
mapboxgl.accessToken =  'pk.eyJ1IjoiZGNoZW5nMDEwNCIsImEiOiJjaXE0MDh2MHQwMG9xZnhtNGg0azVybGxtIn0.7jdNnbpd8kQI3qO1HfSnUg';

class Map extends React.Component {
    // mapContainer = React.createRef();
    panelContainer = React.createRef();
    state = {
        loading:true,
        geos: {},
        year : 2014,
        value:'usage',
        usetype:'all',
        barDisplay: false,
        d3Display:false,
        allData:{},
        chartData : [],
        layerList:['nb-boundary','nb-boundary-masked','nb-boundary-all'],
        values:{'Total':'usage', 'Median':'usage_med','Median Per sqft':'usage_med_sqft'},
        usetypes:{'All':'all','Commercial':'commercial','Institutional':'institutional','Industrial':'industrial','Mixed Use':'mixed_use','Other':'other','Residential':'res'}
    };

    updateYear =(year)=>{
        this.setState({year:year});
    }

    updateBar =(display)=>{
        this.setState({barDisplay:display});
    }
    updateValue =(value) =>{
        this.setState({value:this.state.values[value]});
    }
    updateUsetype =(value) =>{
        this.setState({usetype:this.state.usetypes[value]});   
    }
    updateD3Display = (value) => {
       this.setState({d3Display:value});
    }

    addLayer = (id,paint,filter,type) =>{
        this.map.addLayer({
            "id": id,
            "type": type,
            "source": "base_nb",
            "paint": paint,
             "filter":  filter
          });        
    }

    componentDidMount() {
        this.getAllData();
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/dcheng0104/cjgfnupla000k2rpjeim3qsbl',
            zoom : 9,
            center: [ -118.382877, 34.014700]

          });

        this.map.on('load',()=>{
            this.getAllUsage().then(data => {
                let results = {};
                results['type'] = "FeatureCollection";
                results["features"] = [];
                data.data.forEach(geo=>{
                    let feature = {};
                    feature.type = "Feature";
                    //need to convert json string to int, otherwise the legend wont work
                    feature.properties = {"name":geo.name,"usetype":geo.usetype,"id":geo.id,"usage":Number(geo.usage),"sqft":Number(geo.sqft),"usage_med":Number(geo.usage_med),"usage_med_sqft":Number(geo.usage_med_sqft),"year":geo.year,"data_load_period_id":geo.data_load_period_id};
                    feature.geometry = JSON.parse(geo.st_asgeojson);
                    results.features.push(feature);
                })
                this.setState({ geos:results });
                this.map.addSource("base_nb",{
                    "type": "geojson",
                    "data": this.state.geos
                });
                const layerInfo = {
                    "nb-boundary":{'type':'fill','paint':{"fill-outline-color": "#e1cdb5",'fill-opacity': 1},'filter':["all",['==','year',this.state.year],['!=',this.state.value,-9999],['!=',this.state.value,-8888],['!=',this.state.value,-7777],['==','usetype',this.state.usetype]]},
                    "nb-boundary-masked":{'type':'fill','paint':{'fill-pattern': 'masked-pattern',"fill-outline-color": "#e1cdb5",'fill-opacity': 0.5},'filter':["all",['==','year',this.state.year],['==',this.state.value,-9999],['==','usetype',this.state.usetype]]},
                    "nb-boundary-all":{'type':'line','paint':{"line-color": "#e1cdb5"},'filter':["all",['==','year',this.state.year],['==','usetype',this.state.usetype]]} }
                this.state.layerList.forEach(layer=>{
                    this.addLayer(layer,layerInfo[layer]['paint'],layerInfo[layer]['filter'],layerInfo[layer]['type']);
                });
                this.setFill();
                this.setState({loading:false});
            });

            this.map.on('click',(e)=>{
                const features = this.map.queryRenderedFeatures(e.point,{layers:['nb-boundary']});
                if (features.length>0){
                    this.updateBar(true);
                    let data = [];
                    const id = features[0].properties.id;
                    let usetypes;
                    if (this.state.usetype == 'all') { usetypes = ["commercial","institutional","other","industrial","res","mixed_use"];}     
                    else {usetypes = [this.state.usetype]}            
                    const years = [2011,2012,2013,2014,2015,2016];
                    // let tempData = {"commercial":[],"institutional":[],"other":[],"industrial":[],"res":[],"mixed_use":[]};
                    years.forEach((year)=>{
                        let item = {};
                        item['year'] = year;
                        usetypes.forEach((usetype)=>{
                            this.state.allData.features.forEach((feature)=>{
                                if (feature.properties.id== id & feature.properties.year == year & feature.properties.usetype == usetype & ![-7777,-8888,-9999].includes(feature.properties[this.state.value])){
                                let usage;
                                usage = feature.properties[this.state.value];
                                item[usetype] = usage;         
                                }
                            });
                        });
                        data.push(item);
                    })

                    this.setState({chartData:data});
                    this.updateD3Display(true);
                }
            });
        });
    }

    componentDidUpdate() {
        const filter = ["all",['==','year',this.state.year],['==','usetype',this.state.usetype]];
        const filter_nb = ["all",['==','year',this.state.year],['!=',this.state.value,-9999],['!=',this.state.value,-8888],['!=',this.state.value,-7777],['==','usetype',this.state.usetype]];
        const filter_nb_masked =   ["all",['==','year',this.state.year],['==',this.state.value,-9999],['==','usetype',this.state.usetype]];  
        if (this.map.getLayer("nb-boundary")){
            this.map.setFilter('nb-boundary',filter_nb);
            this.map.setPaintProperty("nb-boundary",'fill-color',color[this.state.value][this.state.usetype]);
        }
        if (this.map.getLayer("nb-boundary-masked")){
            this.map.setFilter('nb-boundary-masked',filter_nb_masked);
        }

        if (this.map.getLayer("nb-boundary-all")){
            this.map.setFilter('nb-boundary-all',filter);
        }
      }

    getAllUsage=()=>{
        return fetch('api/nbs')
        .then(res => res.json())
    }

    getAllData=()=>{
        fetch('api/all')
        .then(res => res.json())
        .then(data => {
            let results = {};
            results["features"] = [];
            data.data.forEach(geo=>{
                let feature = {};
                feature.properties = {"name":geo.name,"id":geo.id,"usetype":geo.usetype,"usage":Number(geo.usage_int),"sqft":Number(geo.sqft),"usage_med":Number(geo.usage_med),"usage_med_sqft":Number(geo.usage_med_sqft),"year":geo.year,"data_load_period_id":geo.data_load_period_id};
                results.features.push(feature);
            })
            this.setState({ allData:results })
        });
    }
    setFill =() =>{
        this.map.setPaintProperty("nb-boundary",'fill-color',color[this.state.value][this.state.usetype]);
    }
    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {    
        const loading= this.state.loading?(<Loading/>):null;
        return (
        <div  ref={el => this.mapContainer = el} >
            {loading}
            <Bar usetypes={Object.keys(this.state.usetypes)} values={Object.keys(this.state.values)} updateValue={this.updateValue} updateUsetype={this.updateUsetype}/>
            <Legend year ={this.state.year} updateYear={this.updateYear} usetype={this.state.usetype} value={this.state.value}/> 
            <PanelPart barDisplay={this.state.barDisplay} d3Display={this.state.d3Display} updateD3Display={this.updateD3Display} updateBar={this.updateBar} ref={this.panelContainer} chartData={this.state.chartData} usetype = {this.state.usetype}/>
        </div>

      )
              
    }
  }

export default Map;