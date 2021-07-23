import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../services/axios";

const RequestBlood = () => {
    const { user } = useSelector((state) => state.userAuth);
    const [personCode, setPersonCode] = useState("");
    const [person, setPerson] = useState({});
    const [memberList, setMemberList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [bloodTypes, setBloodTypes] = useState([]);
    const [messageColor, setMessageColor] = useState("red");

    const requestBlood = (obj) => {
        axios
            .post("/authority/sendRequest", {
                reqAuthority: user.id,
                reqUser: obj.id,
                reqUserName: obj.personFirstName + " " + obj.personLastName,
                reqFrom: person.id,
                reqFromContact: person.personContact,
                reqFromName:
                    person.personFirstName + " " + person.personLastName,
                reqBloodType: obj.personBloodType,
            })
            .then(({ data }) => {
                if (data.error) {
                    setMessageColor("red");
                } else {
                    setMessageColor("green");
                }
                setErrorMessage(data.message);
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    useEffect(() => {
        axios
            .get("/user/getBloodTypes")
            .then(({ data }) => {
                setBloodTypes(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const getBloodType = (id) => {
        for (var i = 0; i < bloodTypes.length; i++) {
            if (bloodTypes[i].id === id) {
                return bloodTypes[i].bloodType;
            } else {
                continue;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/authority/getDetails/", {
                code: personCode,
                id: user.id,
            })
            .then(({ data }) => {
                if (data.error) {
                    setMessageColor("red");
                    setErrorMessage(data.message);
                } else {
                    setMessageColor("green");
                    setErrorMessage("");
                    let person = data.data;
                    setPerson(person);
                    axios
                        .get("/user/getMembers/" + person.id)
                        .then(({ data }) => {
                            if (data.error) {
                                setMemberList([person]);
                            } else {
                                data.data.unshift(person);
                                setMemberList(data.data);
                            }
                        })
                        .catch((e) => {
                            console.log(e.message);
                        });
                }
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
                        <h3>Request Blood</h3>
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
                        {errorMessage ? (
                            <>
                                <div className="card card-login">
                                    <div className="card-content">
                                        <div
                                            className={`title ${messageColor}-text center`}
                                        >
                                            {errorMessage}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {memberList.length !== 0 && (
                                    <ul className="collection">
                                        {memberList.map((el, index) => (
                                            <li
                                                className="collection-item avatar"
                                                key={el.id}
                                            >
                                                <i
                                                    className={
                                                        index === 0
                                                            ? "material-icons circle red-text listIcon"
                                                            : "material-icons circle listIcon"
                                                    }
                                                >
                                                    account_circle
                                                </i>
                                                <span className="title">
                                                    {el.personFirstName +
                                                        " " +
                                                        el.personLastName}
                                                </span>
                                                <p>{el.personLocation}</p>
                                                <p>
                                                    {"Blood Type: " +
                                                        getBloodType(
                                                            el.personBloodType
                                                        )}
                                                </p>
                                                <a
                                                    href="#!"
                                                    className="secondary-content"
                                                >
                                                    <div
                                                        onClick={() => {
                                                            requestBlood(el);
                                                        }}
                                                        className="black-text btn listIcon"
                                                    >
                                                        REQUEST
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RequestBlood;
