import React, { Component } from 'react' 

class Footer extends Component{

    render(){
        return(
            <div className="footer">
				<div className="footer-inner">
					<div className="footer-content">
						<span className="bigger-120">
						<span className="blue bolder">Implosa &copy; {new Date().getFullYear()}</span>
							 
						</span> 
						{/* <span className="action-buttons"> 
							<Link target='_blank' to="https://facebook.com/implosa" >
								<i className="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
							</Link> 
						</span> */}
					</div>
				</div>
			</div>
        )
    }
}

export default Footer 
