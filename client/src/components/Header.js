import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userAuth";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Header = ({
    heading,
    users = [],
    handleLoginFor,
    handleUserRegister,
}) => {
    const { isAuthenticated, user } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch(logoutUser());
    const history = useHistory();

    const [messages, setMessages] = useState([]);
    const [messageError, setMessageError] = useState("");

    useEffect(() => {
        if (user) {
            axios
                .get("/user/getNotifications/" + user.id)
                .then(({ data }) => {
                    if (data.error) {
                        setMessageError(data.message);
                    } else {
                        setMessages(data.data);
                    }
                })
                .catch((e) => {
                    console.log(e.message);
                });
        }
    });

    const dismissMessage = (el) => {
        axios
            .post("/user/dismissNotification", { id: el.id })
            .then(({ data }) => {
                if (!data.error) {
                    setMessages(messages.filter((elm) => elm !== el));
                } else {
                    console.log(data);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    const acceptMemberRequest = (message) => {
        axios
            .post("/user/accceptRequest", message)
            .then(({ data }) => {
                dismissMessage(message);
                alert(data.message);
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        history.push("/");
        window.location.reload();
    };

    return (
        <>
            <header>
                <div className="navbar-fixed">
                    <nav className="navbar white">
                        <div className="nav-wrapper">
                            <Link
                                to="/admin/dashboard"
                                className="brand-logo grey-text text-darken-4"
                            >
                                {heading}
                            </Link>
                            {isAuthenticated && (
                                <div>
                                    <ul id="nav-mobile" className="right">
                                        <li>
                                            <a
                                                href="#!"
                                                data-target="dropdown1"
                                                className="dropdown-trigger"
                                            >
                                                {messages.length === 0 ? (
                                                    <i className="material-icons">
                                                        notifications
                                                    </i>
                                                ) : (
                                                    <i className="material-icons green-text">
                                                        notifications_active
                                                    </i>
                                                )}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#!"
                                                data-target="chat-dropdown"
                                                className="dropdown-trigger"
                                            >
                                                <i className="material-icons">
                                                    account_circle
                                                </i>
                                            </a>
                                        </li>
                                    </ul>
                                    <a
                                        href="#!"
                                        data-target="sidenav-left"
                                        className="sidenav-trigger left"
                                    >
                                        <i className="material-icons black-text">
                                            menu
                                        </i>
                                    </a>
                                </div>
                            )}

                            {!isAuthenticated && (
                                <div>
                                    <a
                                        href="#!"
                                        className="logo-container black-text"
                                    >
                                        Blood Doner Website
                                        <i className="material-icons blue-text left">
                                            spa
                                        </i>
                                    </a>
                                    <ul className="right">
                                        <li>
                                            <a
                                                className="dropdown-trigger"
                                                href="#!"
                                                data-target="dropdownLogin"
                                            >
                                                Login
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#!"
                                                onClick={handleUserRegister}
                                            >
                                                Register
                                            </a>
                                        </li>
                                    </ul>
                                    <ul
                                        id="dropdownLogin"
                                        className="dropdown-content"
                                    >
                                        {users.map((user) => (
                                            <li key={user.id}>
                                                <a
                                                    onClick={() => {
                                                        handleLoginFor(
                                                            user.type
                                                        );
                                                    }}
                                                    href="#!"
                                                >
                                                    As {user.type}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
                <div id="dropdown1" className="dropdown-content notifications">
                    <div className="notifications-title">notifications</div>
                    {messageError ? (
                        <p className="red-text">{messageError}</p>
                    ) : (
                        <></>
                    )}
                    {messages.map((el) => (
                        <div key={el.id} className="card">
                            <div className="card-content">
                                <span className="card-title">{el.message}</span>
                                <p>From: {el.fromUserName}</p>
                            </div>
                            <div className="card-action">
                                {el.messageType === "member" && (
                                    <a
                                        href="#!"
                                        onClick={() => {
                                            acceptMemberRequest(el);
                                        }}
                                    >
                                        Accept
                                    </a>
                                )}

                                <a
                                    href="#!"
                                    onClick={() => {
                                        dismissMessage(el);
                                    }}
                                >
                                    dismiss
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    id="chat-dropdown"
                    className="dropdown-content dropdown-tabbed"
                >
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s3">
                            <a href="#friend">Account</a>
                        </li>
                    </ul>
                    <div id="friends" className="col">
                        <div className="card accountCard">
                            <i className="material-icons left accountIcon">
                                account_circle
                            </i>
                            <span>
                                {user != null ? (
                                    <>
                                        <h5>{user.name}</h5>
                                        <h6>{user.username}</h6>
                                        {user.userType === "user" ? (
                                            <h6 className="right">
                                                {"Code: " + user.userCode}
                                            </h6>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                ) : (
                                    ""
                                )}
                            </span>
                        </div>
                    </div>
                    <a
                        href="#!"
                        className="waves-effect waves-teal btn-flat logoutBtn"
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </a>
                </div>
            </header>
        </>
    );
};

export default Header;
