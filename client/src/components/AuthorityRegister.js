import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const AuthorityRegister = () => {
    const { user } = useSelector((state) => state.userAuth);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [authorityState, setAuthorityState] = useState("");
    const [authorityPinCode, setAuthorityPinCode] = useState("");
    const [authorityTaluka, setAuthorityTaluka] = useState("");
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [authorityContact, setAuthorityContact] = useState("");
    const [contactError, setContactError] = useState("");
    const [registerSuccess, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === cPassword) {
            axios
                .post("/admin/authorityRegister", {
                    authorityName: name,
                    authorityLocation: location,
                    authorityUsername: username,
                    authorityPassword: password,
                    authorityPinCode,
                    authorityTaluka,
                    authorityContact,
                    authorityState,
                    authorityAdmin: user.id,
                })
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        setEmailError(data.message);
                    } else {
                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false);
                        }, 2000);
                        setName("");
                        setLocation("");
                        setUsername("");
                        setCPassword("");
                        setPassword("");
                        setAuthorityState("");
                        setAuthorityPinCode("");
                        setAuthorityState("");
                        setAuthorityTaluka("");
                        setAuthorityContact("");
                    }
                })
                .catch((error) => console.log(error));
        } else {
            setError(true);
        }
    };

    return (
        <main className="mainContainer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Register Authority</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="card card-login">
                            <div className="card-content">
                                {registerSuccess && (
                                    <div className="errorAuthRegister">
                                        <span>Authority Registered</span>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="input-field">
                                        <input
                                            id="name"
                                            type="text"
                                            className="validate"
                                            required
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="name">
                                            Authority Name
                                        </label>
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    id="location"
                                                    type="text"
                                                    className="validate"
                                                    required
                                                    value={location}
                                                    onChange={(e) => {
                                                        setLocation(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label htmlFor="location">
                                                    Address
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    id="state"
                                                    type="text"
                                                    className="validate"
                                                    required
                                                    value={authorityState}
                                                    onChange={(e) => {
                                                        setAuthorityState(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label htmlFor="state">
                                                    State
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    type="number"
                                                    className="validate"
                                                    required
                                                    value={authorityPinCode}
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value
                                                                .length <= 6
                                                        ) {
                                                            setAuthorityPinCode(
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="location">
                                                    Pin Code
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    type="text"
                                                    className="validate"
                                                    required
                                                    value={authorityTaluka}
                                                    onChange={(e) => {
                                                        setAuthorityTaluka(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label htmlFor="location">
                                                    Taluka
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="number"
                                            className="validate"
                                            required
                                            value={authorityContact}
                                            onChange={(e) => {
                                                if (
                                                    e.target.value.length <= 10
                                                ) {
                                                    setAuthorityContact(
                                                        e.target.value
                                                    );
                                                    setContactError(false);
                                                }
                                            }}
                                        />
                                        <label htmlFor="name">Contact</label>
                                        {contactError && (
                                            <span className="helper-text red-text">
                                                Contact must be of length 10
                                            </span>
                                        )}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            id="username"
                                            type="email"
                                            className="validate"
                                            required
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value);
                                                setEmailError("");
                                            }}
                                        />
                                        <label htmlFor="username">
                                            Authority Username / Email
                                        </label>
                                        {emailError && (
                                            <span className="helper-text red-text">
                                                {emailError}
                                            </span>
                                        )}
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="validate"
                                                    required
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                        setError(false);
                                                    }}
                                                />
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    id="cPassword"
                                                    type="password"
                                                    className="validate"
                                                    required
                                                    value={cPassword}
                                                    onChange={(e) => {
                                                        setCPassword(
                                                            e.target.value
                                                        );
                                                        setError(false);
                                                    }}
                                                />
                                                <label htmlFor="cPassword">
                                                    Confirm Password
                                                </label>
                                                {error && (
                                                    <span className="helper-text red-text">
                                                        Passwords do not match
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            className="btn right"
                                            type="submit"
                                            value="Register"
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

export default AuthorityRegister;
