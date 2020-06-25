import React, {  Component } from 'react';
import { 
	Route,  
	Switch,  
} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/vta'
import Project from './pages/vta/project'
import Profile from './pages/profile'
import Logout from './pages/Logout'
import PrivateRoute from './helpers/auth'
import Error404 from './pages/404'
import branchOfic from './pages/vta/boffices'
import supplier from './pages/sup/index'  
import reporte from './pages/sup/ret_prov' 
import suc from './pages/vta/suc' 
class Routes extends Component {
    render(){
        return(   
            <div>
                    <Switch> 
                        <Route exact path='/' component={Login}/>  
                         
                        <PrivateRoute path='/vta' component={Dashboard} />
                        <PrivateRoute path='/prof' component={Profile} />
                        <PrivateRoute path='/prjt' component={Project} />
                        <PrivateRoute path='/suc' component={branchOfic} />
                        <PrivateRoute path='/suppliers' component={supplier} /> 
                        <PrivateRoute path='/repo/:mes/:nmes/:anio/:cod' component={reporte} /> 
                        <PrivateRoute path='/logout' component={Logout} />
                        
                        <Route path='/vta.suc' component={suc} /> 
                        <Route component={Error404} />
                    </Switch>  
            </div> 
        )
    }
}

export default Routes