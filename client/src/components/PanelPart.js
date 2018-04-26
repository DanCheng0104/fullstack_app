import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import BarChart from './BarChart';
import '../css/style.css';



class PanelPart extends Component {
  panelRef = React.createRef();
  barRef = React.createRef();
  state = {
    display:false
  }
  componentDidUpdate(){
      if (this.props.barDisplay) {
        this.panelRef.current.style["grid-row"]="14/19";

      }
  }

  ArrowChange=(e)=>{
    console.log(this.panelRef);
    if (e.target.className === 'glyphicon glyphicon-chevron-down'){
      e.target.className='glyphicon glyphicon-chevron-up';
      this.panelRef.current.style["grid-row"]="18/18";
      this.barRef.current.node.childNodes[0].style.height = '0px';
      this.props.updateBar(false);
      //this.props.updateD3Display(false);
      
    }else{
      e.target.className='glyphicon glyphicon-chevron-down';
      this.panelRef.current.style["grid-row"]="14/19";
      this.barRef.current.node.childNodes[0].style.height = '170px'
      this.props.updateBar(true);
      //this.props.updateD3Display(true);
      
    }
    
  }

  render() {      
      // const barChart = this.props.barDisplay ? (<BarChart chartData = {this.props.chartData} d3Display = {this.props.d3Display} updateD3Display = {this.props.updateD3Display}/>):null;
      const arrow = this.props.barDisplay ? (<span className="glyphicon glyphicon-chevron-down"  ref={ss => this.ss = ss} onClick={(e)=>this.ArrowChange(e)}></span>):(<span className="glyphicon glyphicon-chevron-up" ref={ss => this.ss = ss} onClick={(e)=>this.ArrowChange(e)}></span>);
    return (      
      <div className='bot-bar' ref={this.panelRef}>
          {arrow}
          <BarChart ref = {this.barRef} chartData = {this.props.chartData} d3Display = {this.props.d3Display} updateD3Display = {this.props.updateD3Display} usetype={this.props.usetype}/>
      </div>

      
    );
  }
}

export default PanelPart;
