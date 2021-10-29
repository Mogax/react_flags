import Home from "./pages/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/a-propos" exact component={About}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
