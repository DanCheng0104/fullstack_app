import React, { Component } from 'react';


class Bar extends Component {

  valueChange=(event)=>{
    this.props.updateValue(event.target.value);

  }
  usetypeChange=(event)=>{
    this.props.updateUsetype(event.target.value);
 }
  render() {

    return (
      <div className='middlebar'>
        <div></div>
        <div className='selectContent'>
            <span>Show the </span>
            <select onChange={this.valueChange}>
                {this.props.values.map((value,index)=>{return <option key ={index}>{value}</option>})}
            </select>
            <span> Water Consumption of buildings categorized as </span>
            <select onChange={this.usetypeChange}>
                {this.props.usetypes.map((value,index)=>{return <option key ={index}>{value}</option>})}
            </select>
        </div>
        <div></div>      
      </div>

    );
  }
}

export default Bar;
