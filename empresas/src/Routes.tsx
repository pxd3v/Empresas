import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Main } from './pages/Main/Main';
import { PrivateRoute } from './components/PrivateRoute';
import useAuth from './hooks/useAuth';

export const Routes: React.FC = () => {
    const authContext = useAuth();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(authContext.isLoggedIn);
    }, [authContext.isLoggedIn]);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Redirect to="/main" /> : <Login />}
                </Route>
                <PrivateRoute path="/main" isLoggedIn={isLoggedIn}>
                    <Main />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};
