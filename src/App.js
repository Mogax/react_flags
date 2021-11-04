import {HashRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="App">
        <HashRouter>
            <Switch>
                {/*<Route path="" exact component={Home}/>*/}
                <Route path="/" exact component={Home}/>
                <Route path="/a-propos" exact component={About}/>
                <Route path="/news" exact component={News}/>
                <Route component={NotFound}/>
            </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
