import React, { Component } from 'react'  
// Basic component
import SideBar from '../../components/helpers/sidebar'
import Header from '../../components/helpers/header'  
import PiePagina from '../../components/helpers/footer'
import Cargar from '../../components/helpers/cargar'
import  { Redirect } from 'react-router-dom' 
// imagenes cards
import 'bootstrap/dist/css/bootstrap.min.css';  
// componentes de la pagina de proyectos 

//others components 
import {   
	Row, 
    Col,   
    Card,
    Input ,
  CardImg,
  Button
  } from "reactstrap";
class index extends Component{

    constructor(){
        super()
        this.state = {
            loading : true,
            cod: null,
            username : null, 
            auth: false,
            expanded :false,
            apel : null,
            num :null,
            pic : null,
            
        } 
        this.expand = this.expand.bind(this)
        this.SaveData = this.SaveData.bind(this)
    }   
    async componentDidMount(){
    //let URLactual = window.location.href; 
    //console.log(URLactual) 
        const token = localStorage.getItem('token')
        await fetch('http://www.implosa.com:5000/auth/protected1', {
           headers: new Headers({ 'Authorization': `Bearer ${token}` })})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then(user => { 
                console.log(user); 
               localStorage.setItem('token', user[1]); 
                this.setState({ 
                 username : user[0][0] , 
                    apel : user[0][1] ,
                       cod : user[0][2], 
                       loading : false, 
                       num :  user[0][5] ,
                       pic :  user[0][6],
                       ext : null,
                    })
                
            })
            .catch(e => { 
               // localStorage.clear()
               
            });
             

    } 
      
   async SaveData(e){
        e.preventDefault()
        let forma = new FormData(e.target)    
        if (document.getElementById("cPassword").value !== document.getElementById('Password').value){
            alert ('Campo de Password no coinciden...verificar')
            document.getElementById("cPassword").focus(); 
            return null;
        } 
        const requestInfo = {
            method: 'POST',
            body:  forma ,
        }; 
        
        await fetch('http://www.implosa.com:5000/auth/poup', requestInfo)
        .then(response =>{
            if(response.ok) {
			
                return response.json();
            } 
        })
        .then( (data)=>{
            console.log(data['ruta']) 
            this.setState({
                pic : data['ruta'],
            })
        })
        
    }
    expand(exp){ 

            if (exp){
                this.setState({ expanded :true })
            }else {
                this.setState({ expanded :false })  
            }
    }  
    validaFile(){
        let file = document.getElementById("ImgFile")
         
         if( file.files[0].size > 3000000) {
             alert('El archivo no debe superar los 3MB')
             file.name = ''
             file.value = ''
         }else{
              
              let fext = file.files[0].name.split('.').pop()
              fext = fext.toLowerCase() 
              switch (fext) {
                case 'jpg' : return null 
                case 'jpeg' :  return null
                default:
                    alert('El archivo no tiene la extensión adecuada');
                    file.name = ''
                    file.value = '' 
              }
            
         }
    }
    
    render(){
          document.title = 'SIC -  Perfil'; 
		 
        if (this.state.loading === true){
            return (
                <div >
                   <Cargar   /> 
                </div>
            ) 
        }  
       
        if(localStorage.getItem('token') === null) {return (<Redirect to='/'  />)}
        return (
             
            <div>  <Header logo = {this.state.pic} username = {this.state.username} />   
                 
                <div id='container' style={{  backgroundColor:'white'
                        }}   >  
                      <SideBar id='sidebar' expand={this.expand}
                             usu = {localStorage.getItem('usu')} />
             
                        <div   style={{
                            marginLeft: this.state.expanded ? 240 : 0,
                            padding: '15px 20px 0 20px',
                            }} >
                            <div  id=   'UserInfo' >
                                <div id='nav' >   
                                    <div className="sc-bdVaJa bWcVOO">  
                                            <Row>
                                                <Col md={3}>
                                                    <Card>
                                                         <CardImg  top width="250px"  height="350px" src={this.state.pic}   />
                                                         
                                                    </Card>
                                                   
                                                </Col>
                                                <Col  md={6}>
                                                <form
                                                onSubmit={this.SaveData}  
                                                method="POST"
                                                encType="multipart/form-data"
                                                >
                                                    <input type='hidden' name='txtuser' defaultValue={localStorage.getItem('usu')} />
                                                   <div className="profile-user-info profile-user-info-striped">
                                                        <div className='profile-info-row'>
                                                                <div className="profile-info-name">
                                                                    Usuario
                                                                </div>
                                                                <div className="profile-info-value">
                                                                   <b>{localStorage.getItem('usu')}</b> 
                                                                </div> 
                                                        </div> 
                                                        <div className='profile-info-row'>
                                                                <div className="profile-info-name">
                                                                    Nombre
                                                                </div>
                                                                <div className="profile-info-value">
                                                                    <Input type='text'  name='txtnom'  placeholder='Nombre'   
                                                                        defaultValue={this.state.username} />
                                                                </div> 
                                                        </div> 
                                                        <div className='profile-info-row'>
                                                                <div className="profile-info-name">
                                                                    Apellido
                                                                </div>
                                                                <div className="profile-info-value">
                                                                    <Input type='text'  name='txtapell' placeholder='Apellido'   
                                                                        defaultValue={this.state.apel}/>
                                                                </div> 
                                                        </div> 
                                                          <div className='profile-info-row'>
                                                                <div className="profile-info-name">
                                                                    Imagen de Perfil
                                                                </div>
                                                                <div className="profile-info-value">
                                                                    <Input type="file" name="ImgFile" onChange={this.validaFile} accept=".jpg" id="ImgFile" />
                                                                </div> 
                                                        </div>   
                                                        <div className='profile-info-row'>
                                                                <div className="profile-info-name">
                                                                    Telefono
                                                                </div>
                                                                <div className="profile-info-value">
                                                                    <Input type='tel' name='txtel' placeholder='999-999/9999-9999'   
                                                                         defaultValue={this.state.num} />
                                                                </div> 
                                                        </div> 
                                                        <div className='profile-info-row'>
                                                                <div className="profile-info-name">
                                                                Password
                                                                </div>
                                                                <div className="profile-info-value">
                                                                    <Input type="password" name="password" id="Password" placeholder="password" />
                                                                </div> 
                                                        </div> 
                                                        <div className='profile-info-row'>
                                                                <div className="profile-info-name">
                                                                    Confirmar Password
                                                                </div>
                                                                <div className="profile-info-value">
                                                                    <Input type="password" name="cPassword" 
                                                                    id="cPassword" placeholder="confirmar password"   />
                                                                </div> 
                                                        </div>
                                                   </div>
                                                   <br/>
                                                
                                                   <div className="profile-user-info">
                                                      <center><Button type='submit'>Guardar Cambios</Button>
                                                          </center>  
                                                   </div>
                                                </form>    
                                                </Col>
                                            </Row> 
                                    </div>  
                                </div> 
                            </div> 
						</div>
					</div>  
                    <PiePagina />
            </div>
        )
    }
}

export default index