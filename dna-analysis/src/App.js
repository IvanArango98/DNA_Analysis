import Main from './components/Index'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ImagenComp from './components/Images/Images';
import WebCampComp from './components/Images/WebCam';

function App() {
  return (
    <div className="App">
      <Main/>
      <Router>
                    <Switch>
                        <Route path="/imagen" component={ImagenComp} />
                        <Route path="/webcam" component={WebCampComp} />
                    </Switch>
                </Router>
    </div>
  );
}

export default App;
