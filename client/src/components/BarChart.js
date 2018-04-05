import React, { Component } from 'react';
import * as d3 from "d3";
import { axis } from 'd3-axis';
import { max } from 'd3-array';
import { stack } from 'd3-shape';
import { select } from 'd3-selection';

class BarChart extends Component {

   componentDidMount() {
      this.createBarChart2()
   }
   componentDidUpdate() {
      this.createBarChart2()
   }
//    createBarChart =() => {
//       const node = this.node
//       const dataMax = max(this.props.data)
//       const yScale = scaleLinear()
//          .domain([0, dataMax])
//          .range([0, this.props.size[1]])
//         select(node)
//             .selectAll('rect')
//             .data(this.props.data)
//             .enter()
//             .append('rect')
        
//         select(node)
//             .selectAll('rect')
//             .data(this.props.data)
//             .exit()
//             .remove()
        
//         select(node)
//       .selectAll('rect')
//       .data(this.props.data)
//       .style('fill', '#fe9922')
//       .attr('x', (d,i) => i * 25)
//       .attr('y', d => this.props.size[1] - yScale(d))
//       .attr('height', d => yScale(d))
//       .attr('width', 25)
//    }

   createBarChart2 =() => {
    const node = this.node;
    var xData = ["A", "B", "C"];
    var data=[
 
        {month:'Jan', A:20, B: 5,  C: 10},
        {month:'Feb', A:25, B: 10, C: 20}
        
    ];
    var margin = {top: 20, right: 50, bottom: 30, left: 50},
            width = 400 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
    var y = d3.scaleLinear().rangeRound([height, 0]);     
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.35);
    

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var xAxis =d3.axisBottom(x).tickFormat(function(d) { return d.x;});;
    // var xAxis = d3.svg.axis()
    //         .scale(x)
    //         .orient("bottom");
     
    var svg = select(node).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     
    var dataIntermediate = xData.map(function (c) {
        return data.map(function (d) {
            return {x: d.month, y: d[c]};
        });
    });
     
    var dataStackLayout = d3.stack().keys(["Jan", "Feb"]).offset(d3.stackOffsetDiverging)(dataIntermediate);

     
    x.domain(dataStackLayout[0].map(function (d) {
        return d.x;
    }));
     
    y.domain([0,
        max(dataStackLayout[dataStackLayout.length - 1],
                function (d) { return d.y0 + d.y;})
        ])
      .nice();
     
    var layer = svg.selectAll(".stack")
            .data(dataStackLayout)
            .enter().append("g")
            .attr("class", "stack")
            .style("fill", function (d, i) {
                return color(i);
            });
     
    layer.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y + d.y0);
            })
            .attr("height", function (d) {
                return y(d.y0) - y(d.y + d.y0);
            })
            .attr("width", x.rangeBand());
     
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
   }
render() {
      return <svg ref={node => this.node = node}
      width={500} height={200}>
      </svg>
   }
}
export default BarChart