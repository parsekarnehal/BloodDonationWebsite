import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SiteHome from "./components/SiteHome";
import AdminHome from "./components/AdminHome";
import { useSelector } from "react-redux";
import AuthorityHome from "./components/AuthorityHome";
import UserHome from "./components/UserHome";

function App() {
    const { user, isAuthenticated } = useSelector((state) => state.userAuth);

    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            {user === null ? (
                                <SiteHome />
                            ) : (
                                <>
                                    {user.userType === "admin" && <AdminHome />}
                                    {user.userType === "user" && <UserHome />}
                                    {user.userType === "authority" && (
                                        <AuthorityHome />
                                    )}
                                </>
                            )}
                        </Route>
                        {isAuthenticated && (
                            <>
                                {user.userType === "admin" && (
                                    <Route path="/admin/dashboard">
                                        <AdminHome />
                                    </Route>
                                )}
                                {user.userType === "authority" && (
                                    <Route path="/authority/dashboard">
                                        <AuthorityHome />
                                    </Route>
                                )}
                                {user.userType === "user" && (
                                    <Route path="/user/dashboard">
                                        <UserHome />
                                    </Route>
                                )}
                            </>
                        )}
                        <Route
                            path="*"
                            component={() => (
                                <h1 className="center">404 not found</h1>
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
