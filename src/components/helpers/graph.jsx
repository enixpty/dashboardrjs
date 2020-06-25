import React , { Component } from 'react'
import Chart from 'react-apexcharts'

class graph extends Component {

    render(){
        return(
            <>
                <Chart options={this.props.options} 
					    series={this.props.series} 
                        type={this.props.type}
                        height={this.props.heigth} 
                        />
            </>
        )
    }
}

export default graph