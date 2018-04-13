import React, { Component } from 'react';
import '../css/style.css';
import {color} from '../label.json'

class Legend extends Component {
    handlerChange(e,year,direction){
        console.log(direction);
        let newYear = (direction==='left'?year-1:year+1);
        //time period from 2011 to 2016
        if (newYear === 2010) {newYear=2016;}
        if (newYear === 2017) {newYear=2011;}
        this.props.updateYear(newYear);

    }

    render() {
        const legends = color[this.props.value][this.props.usetype];
        const colors= Object.keys(legends);
        const listItems = colors.map((color) =>
        <div className="legendContainer" key={color}><span style={{'backgroundColor': color}}></span><div className="legendTag">{legends[color]}</div></div>
        );
        return (
        <div className="legend">
            <div className="arrow">
                    <span class="glyphicon glyphicon-chevron-left"  onClick={(e)=>{this.handlerChange(e,this.props.year,"left")}}></span>
                    {this.props.year} (HCF)
                    <span class="glyphicon glyphicon-chevron-right" onClick={(e)=>{this.handlerChange(e,this.props.year,"right")}}></span>
            </div>
            <div className = "LegendItems">
                {listItems}
            </div>
        </div>
        );
    }
}

export default Legend;
