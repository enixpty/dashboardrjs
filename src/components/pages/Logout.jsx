import React, { Component } from 'react'

class Logout extends Component {
    constructor(props){
        super(props)
       // localStorage.removeItem('usu');
        localStorage.clear();
        this.props.history.push('/');
    }

    render(){
        return(
           <div>null;</div>
        ) 
    }
}

export default Logout