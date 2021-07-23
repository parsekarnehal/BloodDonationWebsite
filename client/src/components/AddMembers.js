import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../services/axios";

const AddMember = () => {
    const { user } = useSelector((state) => state.userAuth);
    const [personCode, setPersonCode] = useState("");
    const [person, setPerson] = useState({});
    const [personError, setPersonError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [memberList, setMemberList] = useState([]);
    const [msgColor, setMsgColor] = useState("red");

    useEffect(() => {
        axios
            .get("/user/getMembers/" + user.id)
            .then(({ data }) => {
                if (data.error) {
                    setErrorMessage(data.message);
                } else {
                    setMemberList(data.data);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/authority/getDetails/", {
                code: personCode,
                id: user.id,
            })
            .then(({ data }) => {
                if (data.error) {
                    setPersonError(data.message);
                    setPerson({});
                } else {
                    setPersonError("");
                    setPerson(data.data);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    const addMember = () => {
        axios
            .post("/user/sendMessage", {
                message: "Request to be a member.",
                fromUserName: user.name,
                toUser: person.id,
                fromUser: user.id,
                messageType: "member",
            })
            .then(({ data }) => {
                if (data.error) {
                    setMsgColor("red");
                } else {
                    setMsgColor("green");
                }
                setPersonError(data.message);
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    return (
        <main className="mainContainer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Add Members</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="card card-login">
                            <div className="card-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-field">
                                        <input
                                            type="number"
                                            className="validate"
                                            required
                                            value={personCode}
                                            onChange={(e) => {
                                                setPersonCode(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="name">
                                            Person Code
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="btn"
                                            type="submit"
                                            value="Find Doner"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {person.id ? (
                            <>
                                <div className="card card-login">
                                    <div className="card-content">
                                        <div className="row">
                                            <div className="col s6">
                                                <label>First Name</label>
                                                <h6>
                                                    {person.personFirstName}
                                                </h6>
                                                <hr />
                                            </div>
                                            <div className="col s6">
                                                <label>LastName</label>
                                                <h6>{person.personLastName}</h6>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s6">
                                                <label>Email</label>
                                                <h6>{person.personUsername}</h6>
                                                <hr />
                                            </div>
                                            <div className="col s6">
                                                <label>Gender</label>
                                                <h6>{person.personGender}</h6>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12">
                                                <label>Address</label>
                                                <h6>{person.personLocation}</h6>
                                                <hr />
                                            </div>
                                        </div>
                                        <button
                                            onClick={addMember}
                                            className="btn right"
                                        >
                                            REQUEST MEMBER
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        {personError ? (
                            <>
                                <div className="card card-login">
                                    <div className="card-content">
                                        <div
                                            className={`title ${msgColor}-text center`}
                                        >
                                            {personError}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4>Members</h4>
                    </div>
                </div>
                <div>
                    {memberList.length === 0 ? (
                        <>
                            <div className="card card-login">
                                <div className="card-content">
                                    <div className="title red-text center">
                                        {errorMessage}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <ul className="collection">
                            {memberList.map((el) => (
                                <li
                                    className="collection-item avatar"
                                    key={el.id}
                                >
                                    <i className="material-icons circle listIcon">
                                        account_circle
                                    </i>
                                    <span className="title">
                                        {el.personFirstName +
                                            " " +
                                            el.personLastName}
                                    </span>
                                    <p>{el.personLocation}</p>
                                    <p>{el.personTaluka}</p>
                                    <a href="#!" className="secondary-content">
                                        <i className="material-icons contactIcon">
                                            call
                                        </i>
                                        <div className="black-text">
                                            {" " + el.personContact + " "}
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AddMember;
