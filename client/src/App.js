import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Feed from "./layout/Feed";

// Routing
import Routes from "./routes/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import "./styles/index.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Router>
          <Navbar />
          <div style={{ height: "100px" }} />
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
};

export default App;
