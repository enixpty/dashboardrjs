import React, { Component } from 'react';
import logo from '../assets/images/logo_35x35.png' 
import {Link } from "react-router-dom";
import {  
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem } from 'reactstrap'
class Header extends Component{
    
    render(){   
	  const NavBack ={
		  backgroundColor : '#e1251b' ,
		
	  } 
	  const txtlogo = {
		  fontSize : '20px',
		  fontFamily: 'Open Sans',
	  }
        return(
			<div className="navbar---3CgcW navbar-default---1yc1S " style={NavBack}>  
				<div className="container-fluid---2Brsk">  
					<div className="navbar-header---13JWC  "> 
							<Link className="navbar-brand text-white" to='#'  style={{
                        marginLeft:   70  , height:'50px'
                    }}>
								 <small className="font-weight-bold" style={txtlogo}> 	
								<img alt ='Logo Implosa' src={logo} className="menu-icon fa fa-tachometer" />	 Implosa 
								</small>  
							</Link> 
					
					
						<div className="navbar-buttons navbar-header pull-right" role="navigation">
				
							<UncontrolledDropdown nav inNavbar className="nav ace-nav" > 
							<DropdownToggle nav caret className="light-blue dropdown-modal">
							<img  alt ='imagen de perfil' className="nav-user-photo" src={this.props.logo}   />
								<span className="user-info text-white" style={{fontFamily: 'Open Sans'}}>
									<small>Bienvenid@,</small>
									{this.props.username}
								</span>
							</DropdownToggle>
							<DropdownMenu right  >
								<DropdownItem>
									Settings
								</DropdownItem>
								<DropdownItem>
									<Link to='/prof'>Profile</Link>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									<Link to='/logout'>Logout</Link>
								</DropdownItem>
							</DropdownMenu>
							</UncontrolledDropdown>
					
						</div>
					
					</div>
				</div>
			</div>
        )
    }
}
export default Header