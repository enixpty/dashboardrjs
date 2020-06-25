import React, { Component } from 'react';
import { 
	Card,
	CardBody, 
	CardTitle, 
	Row,
	Col 
  } from "reactstrap"; 
  
class card_mont extends Component {

		constructor(){
			super()
		this.format_USD = this.format_USD.bind(this)
		}

    format_USD = (val)=>{
		return val.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		  });
	}
    render(){
         const size = {
             width : '35px',
             heigth : '35px'
         }
        return(
            <>
                	<div style={{ width: "19 rem" }}>
										<Card className="card-stats mb-4 mb-lg-0 shadow card">
											<CardBody>
											<Row>
												<div className="col">
												<CardTitle className="text-uppercase text-muted mb-0">
													{this.props.title} 
												</CardTitle>
                                                    <span className="h4 font-weight-bold mb-0">
                                                        {this.format_USD(this.props.nMeta)}
                                                    </span>
												</div>
												<Col className="col-auto">   
                                                    {/* <img src={this.props.imag}   /> */}
												  <div className="icon icon-shape bg-white text-white top-right">
                                                  <img alt='imagen' src={this.props.imag}  style={size}/>
												</div> 
												</Col>
											</Row>
											<p className="mt-3 mb-0 text-muted text-sm">
												{/*<span className="text-success mr-2">
												<i className="fa fa-arrow-up" />
												3.48%
												</span>
												 <span className="text-nowrap">Since last month</span> */}
											</p>
											</CardBody>
										</Card>
									</div>
            </>
        )
    }

}

export default card_mont