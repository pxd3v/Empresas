import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  isLoggedIn: boolean;
  path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isLoggedIn,
  path,
  children,
}) =>
  isLoggedIn ? <Route path={path}> {children} </Route> : <Redirect to="/" />;
