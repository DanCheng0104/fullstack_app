import React, { Component } from 'react';
import * as d3 from "d3";
import { axis } from 'd3-axis';
import { max } from 'd3-array';
import { stack } from 'd3-shape';
import { select } from 'd3-selection';
// import ResponsiveWrapper from './ResponsiveWrapper';

class BarChart extends Component {

   componentDidMount() {
    window.addEventListener("resize", this.createBarChart);      
   }

   componentDidUpdate() {
    if (this.props.d3Display) {
        this.createBarChart();
      }
   }

   sumValues = (cloneItem) => { 
       return Object.values(cloneItem).reduce((a, b) => a + b)
    };


   createBarChart =() => {
    this.props.updateD3Display(false);
    const node = this.node;
    var s = d3.selectAll('svg');
    s.remove();
    
    //onst data = Object.assign({},this.props.chartData);
    let data = this.props.chartData.slice(0);
    // add function
    if (data[0]['masked'] === undefined){
        data = this.fillMaskValues(data);
    }
    const series = d3.stack()
          .keys([ "res","commercial", "institutional", "other",'mixed_use','industrial','masked'])
          .offset(d3.stackOffsetDiverging)
          (data);

    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = this.node.offsetWidth/2;
    const height = this.node.offsetHeight+60;

      
    const x = d3.scaleBand()
          .domain(data.map(function(d) { return d.year; }))
          .rangeRound([margin.left, width - margin.right])
          .padding(0.1);
      
    const y = d3.scaleLinear()
          .domain([d3.min(series, this.stackMin), d3.max(series, this.stackMax)])
          .rangeRound([height - margin.bottom, margin.top]);
      
    const colors ={"res":'#ffff99',"commercial":'#7fc97f',"institutional":'#beaed4',"other":'#fdc086','mixed_use':'#386cb0','industrial':'#f0027f','masked':'url(#diagonal-stripe-1)'};
    const svg = select(node).append('svg')
    // .classed("svg-container", true) //container class to make it responsive
    // .attr("width", '80%')
    // .attr("height", '20%')
    .attr("viewBox", `0 0 ${width} ${height}`)
    //.attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
    .attr('preserveAspectRatio','xMinYMin')
    //  .classed("bar", true); 
    // add pattern here

    svg.append("defs").append("pattern")
    .attr('id','myPattern')
    .attr("width", 10)
    .attr("height", 8)
    .attr('patternUnits',"userSpaceOnUse")
    .attr('patternTransform','rotate(45)')
    .append('rect')
    .attr("width","8")
    .attr("height","1")
    .attr("transform","translate(0,0)")
    .attr("fill","grey" )

    svg.append("g")
    .selectAll("g")
    .data(series)
    .enter().append("g")
    .style("stroke", 'grey')
    .style("stroke-width", 0.5)
    .attr("fill", function(d) { 
        return ((d.key==='masked')? "url(#myPattern)": colors[d.key]);
     })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("width", x.bandwidth)
    .attr("x", function(d) { return x(d.data.year); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { 
        console.log(d[0]);
        console.log(d[1]);
        return y(d[0]) - y(d[1]); })
      
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

   fillMaskValues = (data) =>{
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
    };

    data.forEach(item=>{
        item["masked"] = maskedValues[item.year]
    })
    return data;
   }
    
   render() {
    return (
        <div className = 'bar_summary'>
            <div className = 'bar' ref={node => this.node = node}></div>
            {/* <div className = 'summary'>summary</div> */}
        </div>
      )
    }
}
export default BarChart;