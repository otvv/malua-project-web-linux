import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// dependencies
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

// components
import Navbar from "./components/navbar";
import Alert from "./components/alert";
import Visuals from "./components/visuals";
import Skins from "./components/skins";
import Settings from "./components/settings";
import Radar from "./components/radar";

// main
function App() {
  return (

    <BrowserRouter className="App">
      <Switch>

        <Route path="/" exact>
          <Navbar />
          <Alert />
        </Route>

        <Route path="/visuals">
          <Navbar />
          <div className="pt-5">
            <Visuals />
          </div>
          <Alert />
        </Route>

        <Route path="/skins">
          <Navbar />
          <div className="pt-5">
            <Skins />
          </div>
          <Alert />
        </Route>

        <Route path="/settings">
          <Navbar />
          <div className="pt-5">
            <Settings />
          </div>
          <Alert />
        </Route>

        <Route path="/radar">
          <Navbar />
          <div className="pt-5">
            <Radar />
          </div>
          <Alert />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;