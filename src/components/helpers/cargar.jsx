import React,  { Component } from 'react'  
import logo from '../assets/media/cargar.gif'
class Carga extends Component{
    
    
    render(){
         

        return(
            <div style={{marginTop: '25%' }} >  
               <center><img alt='cargando...' src={logo}  /> 
               </center>
            </div>
        )
    }
}

export default Carga