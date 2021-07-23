import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../services/axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userAuth";

const LoginForm = ({ title, postUrl, redirect, successMessage = null }) => {
    const dispatch = useDispatch();
    let history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(postUrl, {
                username,
                password,
            })
            .then((response) => {
                const data = response.data;
                if (data.error) {
                    if (data.message === "password") {
                        setPasswordError(true);
                    }
                    if (data.message === "username") {
                        setUsernameError(true);
                    }
                } else {
                    history.push(redirect);
                    dispatch(loginUser(data.user));
                    window.location.reload();
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <main className="center verticalCenter">
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div className="card card-login formFlex">
                            <div className="card-login-splash">
                                <div className="wrapper titlePadding">
                                    <h3>Blood Doner</h3>
                                    <h4>Website</h4>
                                </div>
                                <img
                                    src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/geometric-cave.jpg?v=13127282243134125143"
                                    alt=""
                                />
                            </div>
                            <div className="card-content">
                                <span className="card-title">{title}</span>

                                {successMessage && (
                                    <div>
                                        <span class="green-text">
                                            {successMessage}
                                        </span>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="input-field">
                                        <input
                                            id="username"
                                            type="email"
                                            className="validate"
                                            required
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value);
                                                setUsernameError(false);
                                            }}
                                        />
                                        <label htmlFor="username">
                                            Username
                                        </label>
                                        {usernameError && (
                                            <span className="helper-text red-text right">
                                                Username does not exist
                                            </span>
                                        )}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            id="password"
                                            type="password"
                                            className="validate"
                                            required
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setPasswordError(false);
                                            }}
                                        />
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        {passwordError && (
                                            <span className="helper-text red-text right">
                                                Passwords Incorrect
                                            </span>
                                        )}
                                    </div>
                                    <br />
                                    <br />
                                    <div>
                                        <a href="#!" className="left">
                                            Forgot Password?
                                        </a>
                                        <input
                                            className="btn right"
                                            type="submit"
                                            value="Log In"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginForm;
