import React, { Component } from 'react';
import * as d3 from "d3";
import { axis } from 'd3-axis';
import { max } from 'd3-array';
import { stack } from 'd3-shape';
import { select } from 'd3-selection';
// import ResponsiveWrapper from './ResponsiveWrapper';

class BarChart extends Component {

   componentDidMount() {
      this.createBarChart();
   }
   componentDidUpdate() {
    this.createBarChart();
  }

   sumValues = (cloneItem) => { 
       return Object.values(cloneItem).reduce((a, b) => a + b)
    };

   createBarChart =() => {

    const node = this.node;
    var s = d3.selectAll('svg');
    s.remove();
    
    const data = this.props.chartData;
    const defaultUsetypes = ["commercial","institutional","other","industrial","res","mixed_use"];
    let maxValues ={};
    let maskedValues ={};
    data.forEach(item=>{
        let cloneItem = Object.assign({},item);
        delete cloneItem.year;
        maxValues[item.year]=(this.sumValues(cloneItem));
        defaultUsetypes.forEach((usetype,index)=>{
            if (!Object.keys(cloneItem).includes(usetype)) {
                item[usetype] = 0;
            }
        })
    })
    if (Object.keys(maxValues).length >0) {
        const maxValue = Math.max(...Object.values(maxValues))+100;
        Object.keys(maxValues).forEach((key)=>{
            maskedValues[key] = maxValue - maxValues[key];

        });
        // maxValues.forEach(value=>{
        //     console.log(value);
        // });
    };
    console.log(maskedValues);
    data.forEach(item=>{
        item["masked"] = maskedValues[item.year]
    })
    const series = d3.stack()
          .keys(["commercial", "institutional", "other", "res",'mixed_use','industrial','masked'])
          .offset(d3.stackOffsetDiverging)
          (data);

    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = this.node.offsetWidth;
    const height = 170;

      
    const x = d3.scaleBand()
          .domain(data.map(function(d) { return d.year; }))
          .rangeRound([margin.left, width - margin.right])
          .padding(0.1);
      
    const y = d3.scaleLinear()
          .domain([d3.min(series, this.stackMin), d3.max(series, this.stackMax)])
          .rangeRound([height - margin.bottom, margin.top]);
      
    const colors ={"commercial":'#7fc97f',"institutional":'#beaed4',"other":'#fdc086',"res":'#ffff99','mixed_use':'#386cb0','industrial':'#f0027f','masked':'grey'};
    const svg = select(node).append('svg')
    // .attr("width", '80%')
    // .attr("height", '20%')
    .attr("viewBox", `0 0 ${width} ${height}`)
    //.attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
    .attr('preserveAspectRatio','xMinYMin');
      
    svg.append("g")
    .selectAll("g")
    .data(series)
    .enter().append("g")
    .attr("fill", function(d) { return colors[d.key]; })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("width", x.bandwidth)
    .attr("x", function(d) { return x(d.data.year); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      
    svg.append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));
      
    svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y));
      
}

   stackMin = (serie) =>{
    return d3.min(serie, function(d) { return d[0]; });
  }

   stackMax = (serie) =>{
    return d3.max(serie, function(d) { return d[1]; });
  }
    
   render() {
    return (
        <div ref={node => this.node = node}>
        </div>
      )
    }
}
export default BarChart;