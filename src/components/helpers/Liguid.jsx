import React, {Component} from 'react'
import LiquidFillGauge from 'react-liquid-gauge';
import { color } from 'd3-color';
import {   
	Row,
	Col   
  } from "reactstrap";
class Liquid extends Component {
  constructor(props) {
    super();
    this.state = ({
        value: 75,
    });  
    
        this.formato = this.formato.bind(this)
    }
    
    formato(val){
        return val.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          })
    }
    render() { 
        const radius = 90;
        const fillColor = this.props.color;
        const gradientStops = [
            {
                key: '0%',
                stopColor: fillColor,
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: fillColor,
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

        return (
            <div>
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={this.props.porcv}
                    percent="%"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        //console.log(this.props.porcv);
                        const value = Math.round(this.props.porcv);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };

                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan style={percentStyle}>{props.percent}</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: fillColor //
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }} 
                />
                <div
                    style={{
                        margin: '20px auto',
                        width: 120
                    }}
                >
                   
                </div> 
                <Row >
                    <Col className="text-right ">
                        <p className="text-primary">
                            <i className="fa  fa-fw fa-circle "></i> Ventas : {this.formato(this.props.totvent)}
                        </p>
                                                                    
                    </Col>
                    <Col className="text-left ">
                        <p className="text-success">
                            <i className="fa  fa-fw fa-circle "></i> Meta: {this.formato(this.props.totmet)}
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Liquid