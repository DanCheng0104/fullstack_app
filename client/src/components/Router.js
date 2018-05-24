import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import News from "./News";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Home} />      
      <Route exact path="/dwp" component={App} />
      <Route path="/news" component={News} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
