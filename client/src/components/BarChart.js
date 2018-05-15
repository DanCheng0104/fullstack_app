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
    let data = this.props.chartData.slice(0);
    let keys;
    keys = (this.props.usetype === 'all')?[ "res","commercial", "institutional", "other",'mixed_use','industrial','masked']:[this.props.usetype];
    const colors ={"res":'#DA77F2',"commercial":'#A9E34B',"institutional":'#9775FA',"other":'#38D9A9','mixed_use':'#FF8787','industrial':'#FFA94D','masked':'url(#diagonal-stripe-1)'};
    this.createStackChart(node,data,keys,colors);
    // add function
  }

  createStackChart =(node,data,keys,colors) =>{
    if (data[0]['masked'] === undefined){
        data = this.fillMaskValues(data,keys);
    }
    if (keys.length===1) {keys.push('masked');}
    const series = d3.stack()
          .keys(keys)
          .offset(d3.stackOffsetDiverging)
          (data);

    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = this.node.offsetWidth*1.2;
    const height = this.node.offsetHeight+60;
      
    const x = d3.scaleBand()
          .domain(data.map(function(d) { return d.year; }))
          .rangeRound([margin.left, width - margin.right])
          .padding(0.1);

    const y = d3.scaleLinear()
          .domain([d3.min(series, this.stackMin), d3.max(series, this.stackMax)])
          .rangeRound([height - margin.bottom, margin.top]);
      
    
    const svg = select(node).append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio','xMinYMin');
    // add pattern here
    svg.append("defs").append("pattern")
    .attr('id','myPattern')
    .attr("width", 10)
    .attr("height", 8)
    .attr('patternUnits',"userSpaceOnUse")
    .attr('patternTransform','rotate(-45)')
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
        return y(d[0]) - y(d[1]); 
    })
    .on("mouseover", () =>{ tooltip.style("display", null); })
    .on("mouseout", () =>{ tooltip.style("display", null); })
    .on("mousemove", function(d){
      const xPosition = d3.mouse(this)[0];
      const yPosition = d3.mouse(this)[1];
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      const thisName = d3.select(this.parentNode).datum().key;
      const thisValue = d.data[thisName];

      ts1.text(`${thisName}`);
      if (thisValue < 1 & thisName !== 'masked'){
         ts2.text(d3.format(",.3f")(thisValue) + ' HCF');
      }
      else if (thisName !== 'masked'){
        ts2.text(d3.format(",.2s")(thisValue) + ' HCF'); 
      }
      else {ts2.text('');}
      
     
    });

    svg.append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

    if (this.props.value === 'usage_med_sqft'){
        svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y)
        .ticks(5, ".3f"));    
    }
    else{
        svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y)
        .ticks(5, "s"));          
    }
    // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 80)
    .attr("height", 35)
    .attr("fill", "#FEF7FF");
    // .style("opacity", 0.8);

  var text_node = tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");    

  var ts1 = text_node.append('tspan')
        .attr('dy', '.8em')
        .attr('x',40)
  var ts2 =  text_node.append('tspan')
        .attr('dy', '1.1em')
        .attr('x',40)
  }

   stackMin = (serie) =>{
    return d3.min(serie, function(d) { return d[0]; });
  }

   stackMax = (serie) =>{
    return d3.max(serie, function(d) { return d[1]; });
  }

   fillMaskValues = (data,defaultUsetypes) =>{
    if (defaultUsetypes.length==1){
        let maxValue=0;
        let value;
        data.forEach(item=>{
            if(item[defaultUsetypes[0]] !== undefined){
                value = item[defaultUsetypes[0]];
                maxValue= (maxValue<value)?value:maxValue;
            }
        })
        data.forEach(item=>{
            if(item[defaultUsetypes[0]] === undefined){
                item["masked"] =maxValue;
            }
        })
    }
    else {
        let maxValues ={};
        let maskedValues ={};
        let max = 0;
        data.forEach(item=>{
            let cloneItem = Object.assign({},item);
            delete cloneItem.year;
            maxValues[item.year]={};
            if (Object.keys(cloneItem).length === 0 && cloneItem.constructor === Object){
                maxValues[item.year]['value']=0;
                maxValues[item.year]['count'] = 0;
            }
            else{
                maxValues[item.year]['value']=(this.sumValues(cloneItem));
                maxValues[item.year]['count'] = Object.keys(item).length-1;
            }

            defaultUsetypes.forEach((usetype,index)=>{
                if (!Object.keys(cloneItem).includes(usetype)) {
                    item[usetype] = 0;
                }
            })
        })
        if (Object.keys(maxValues).length >0) {     
            Object.keys(maxValues).forEach((key)=>{
                max = (max < maxValues[key]['value']? maxValues[key]['value']: max);
            });
            const flag = Object.keys(maxValues).find(key => maxValues[key]['count'] === 6);
            if (!Boolean(flag)) {max = 1.15* max;}
            Object.keys(maxValues).forEach((key)=>{
               maskedValues[key] = (maxValues[key]['count']===6)?null:max - maxValues[key]['value'];
            });
        };
    
        data.forEach(item=>{
            item["masked"] = maskedValues[item.year]
        })
    }

    return data;
   }
    
   render() {
    return (
        <div className = 'bar_summary'>
            <div className = 'bar' ref={node => this.node = node}></div>
            <div className = 'summary'></div>
        </div>
      )
    }
}
export default BarChart;