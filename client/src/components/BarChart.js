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
   createBarChart =() => {

    const node = this.node;
    var s = d3.selectAll('svg');
    s.remove();
    
    // const data = this.props.chartData;
    const data = [
      {month: "Q1-2016", apples: 3840, bananas: 1920, cherries: 1960, dates: 400},
      {month: "Q2-2016", apples: 1600, bananas: 1440, cherries: 960, dates: 400},
      {month: "Q3-2016", apples:  640, bananas:  960, cherries: 640, dates: 600},
      {month: "Q4-2016", apples:  320, bananas:  480, cherries: 640, dates: 400},
      {month: "Q5-2016", apples:  320, bananas:  480, cherries: 640, dates: 400}
    ];  
    const series = d3.stack()
          .keys(["apples", "bananas", "cherries", "dates"])
          .offset(d3.stackOffsetDiverging)
          (data);

    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = this.node.offsetWidth;
    const height = 170;

      
    const x = d3.scaleBand()
          .domain(data.map(function(d) { return d.month; }))
          .rangeRound([margin.left, width - margin.right])
          .padding(0.1);
      
    const y = d3.scaleLinear()
          .domain([d3.min(series, this.stackMin), d3.max(series, this.stackMax)])
          .rangeRound([height - margin.bottom, margin.top]);
      
    const z = d3.scaleOrdinal(d3.schemeCategory10);
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
    .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("width", x.bandwidth)
    .attr("x", function(d) { return x(d.data.month); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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