import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Main from "./components/layout/Main";
import Upload_file from "./components/layout/Upload_file";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// import Alert from "./components/layout/Alert";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import { Container } from "semantic-ui-react";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // https://ko.reactjs.org/docs/hooks-effect.html // If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="mainFrame">
            <Navbar />
            <Route exact path="/" component={Main} />
            <section className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/upload_file" component={Upload_file} />
              </Switch>
              {/* <Alert /> */}
            </section>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
