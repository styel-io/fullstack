import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../layout/auth/Register";
import Login from "../layout/auth/Login";
import ForgotPassword from "../layout/auth/ForgotPassword";
import ResetPassword from "../layout/auth/ResetPassword";

import Profiles from "../components/profiles/Profiles";

import NotFound from "../layout/NotFound";
import PrivateRoute from "./PrivateRoute";

import Profile from "../layout/Profile";
import ProfileMe from "../layout/ProfileMe";
import NewPost from "../layout/NewPost";

import UpdateBasic from "../layout/modify/UpdateBasic";

import Check_pass from "../layout/Check_pass";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} />

        {/* Profile */}
        <Route exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/pf/:id" component={ProfileMe} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />

        <PrivateRoute exact path="/newpost" component={NewPost} />
        <PrivateRoute exact path="/Check_pass" component={Check_pass} />
        <PrivateRoute exact path="/basic" component={UpdateBasic} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
