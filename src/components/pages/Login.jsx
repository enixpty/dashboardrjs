import React, { Component } from 'react';
import '../assets/login.css'
import logo from '../assets/media/1logo.jpg'
import StatusAlert, { StatusAlertService } from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message : this.props.location.state?this.props.location.state.message: '',
             
        };
    }

    signIn = (e) => {
        e.preventDefault()
        const data = { name: this.username, password: this.password };
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }; 
        
        fetch('http://www.implosa.com:5000/auth/slcin', requestInfo)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("Usuario o Contrasena inválido...");
        })
        .then(token => {
            
            if (token[0][3] !== '0'){ 
                localStorage.setItem('token', token[1]); 
                localStorage.setItem('usu', this.username )
                this.props.history.push(token[0][3]);// /vta 
                return;
            }else{
                this.setState({ message: 'Usuario Invalido'});
            }
        })
        .catch(e => {
            this.setState({ message: e.message });
            StatusAlertService.showError( e.message);
        }); 
    }

    render() {
        return (
            <div id="login_web_implosa">
                
	            <div id="BG">
                    <div id="Grupo_130"> <StatusAlert/>
                        <img id="ID1logo" src={logo}  alt='Implosa'/>
                    </div>
                    <div id="Inserte_su_nombre_de_usuario_y">
                        <span>Inserte su nombre de usuario y contraseña para acceder a la página</span>
                    </div> 
                    <div id="Grupo_12">
                            <form>
                            <div id="Grupo_21"> 
                                <div className="Rect_ngulo_14"> 
                                    <input type="text"  className='camp-username' id="username"  
                                        onChange={e => this.username = e.target.value} placeholder="Usuario" />
                                </div>  
			                </div>  
                            <div id="Grupo_16">
                                <input type="password" id="password" className="camp-user"  
                                    onChange={e => this.password = e.target.value} placeholder="Contraseña" />
                                 
                            </div>  
                               
                                <button className="button" onClick={this.signIn}> INICIAR SESSIÓN </button>
                            </form>
                    </div>                            
                </div>
            </div>
        );
    }
}