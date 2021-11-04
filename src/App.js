import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/a-propos" exact component={About}/>
                <Route path="/news" exact component={News}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
