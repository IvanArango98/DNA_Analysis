import Main from './components/Index'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login/Login'


function App() {
  return (
    <div className="App">
         <Router>
                <Switch>
                    <Route exact path="/" component={ Login }/>
                    <Route path="/Inicio" component={Main}/>                                                         
                    <Route  path="*" component={() => <h1 style={{marginTop:200}}>404 <br/>Página no Encontrada</h1>}/>1
                </Switch>                
            </Router>
    </div>
  );
}

export default App;
