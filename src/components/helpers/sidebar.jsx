import React, {Component} from 'react'
import SideNav, {   NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {  Link } from 'react-router-dom' 
class sideBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            height : window.innerHeight,
            datos : [],
            exp : false,
        } 
    }
    componentDidMount(){
        document.title = 'SIC - Proyectos';
        const data = { name: localStorage.getItem('usu')  };
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }; 
        fetch('http://www.implosa.com:5000/auth/svmn', requestInfo)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("error al cargar el menu del usuario...");
        })
        .then(data => { 
             this.setState({
                 datos : data
             })
         })
         .catch(e => {
             this.setState({ message: e.message });
         });
    }
    render(){

		  
        return(
            <div style={{ backgroundColor:'#E1252b' }}>
		 <SideNav style={{ backgroundColor:'#E1252b' }}
          onToggle={() => {
                // Add your code here  
                  if (this.state.exp){
                    this.setState({ exp : false })
                    this.props.expand(false)
                }else{
                    this.setState({ exp : true })
                    this.props.expand(true)
                }  
                 
            }}
        >
            <SideNav.Toggle  />  
            <SideNav.Nav  style={{ backgroundColor:'#E1252b' }}> 
                { this.state.datos.map(lists =>(
                        <NavItem eventKey={lists[0]} key={lists[0]}>
                            <NavIcon>
                                 <Link to={lists[1]}> 
                                 <i className={lists[2]} style={{ fontSize: '1.75em' }} /> 
                                        
                                </Link>
                            </NavIcon>
                           <NavText>
                                <Link to={lists[1]}>  {lists[0]}  </Link>
                           </NavText>
                        </NavItem>
                    )
                )} 
                
               {/* <NavItem eventKey="project">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Proyecto
                    </NavText>
                </NavItem>
                 <NavItem eventKey="charts">
                    <NavIcon> 
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Charts
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                        <Link to="/prof">Line Chart </Link>   
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            Bar Chart
                        </NavText>
                    </NavItem>
                </NavItem> */}
            </SideNav.Nav>
        </SideNav> </div>
        )
    }
}

export default sideBar