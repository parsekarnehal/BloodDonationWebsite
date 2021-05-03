import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Requests = () => {
    const { user } = useSelector((state) => state.userAuth);
    const [requestList, setRequestList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios
            .get("/authority/getRequests/" + user.id)
            .then((response) => {
                if (response.data.error) {
                    setErrorMessage(response.data.message);
                } else {
                    setRequestList(response.data.data);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    const deleteRequest = (obj) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            axios
                .post("/authority/deleteRequest", obj)
                .then(({ data }) => {
                    axios
                        .get("/authority/getRequests/" + user.id)
                        .then((response) => {
                            if (response.data.error) {
                                setErrorMessage(response.data.message);
                            } else {
                                setRequestList(response.data.data);
                            }
                        })
                        .catch((e) => {
                            console.log(e.message);
                        });
                })
                .catch((e) => {
                    console.log(e.message);
                });
        }
    };

    return (
        <main className="mainContainer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Requests</h3>
                    </div>
                </div>
                <div className="row">
                    {requestList.length === 0 ? (
                        <div>
                            <div className="title center red-text">
                                {errorMessage}
                            </div>
                        </div>
                    ) : (
                        <ul className="collection">
                            {requestList.map((el) => (
                                <li
                                    className="collection-item avatar"
                                    key={el.id}
                                >
                                    <i className="material-icons circle listIcon">
                                        account_circle
                                    </i>
                                    <span className="title">
                                        {el.reqFromName}
                                    </span>
                                    <p>{"To: " + el.reqUserName}</p>
                                    <p>{"On: " + el.createdAt}</p>
                                    <div className="secondary-content">
                                        <div>
                                            <i className="material-icons contactIcon">
                                                call
                                            </i>
                                            <div className="black-text">
                                                {" " + el.reqFromContact + " "}
                                            </div>
                                        </div>
                                        {el.active && (
                                            <div
                                                className="deleteIcon"
                                                onClick={() => {
                                                    deleteRequest(el);
                                                }}
                                            >
                                                <i className="material-icons red-text">
                                                    delete_forever
                                                </i>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Requests;
