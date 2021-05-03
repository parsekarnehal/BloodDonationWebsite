import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const DonateBlood = () => {
    const { user } = useSelector((state) => state.userAuth);
    const [personCode, setPersonCode] = useState("");
    const [person, setPerson] = useState({});
    const [personError, setPersonError] = useState("");
    const [buttonText, setButtonText] = useState("INCREASE DONER COUNT");
    const [buttonDisable, setButtonDisable] = useState(false);

    // Fucntion to check if 60 days passed from the last donated date.
    function canDonate(previous) {
        let currentDate = new Date();
        let days = Math.ceil((currentDate - previous) / 86400000);
        if (days > 60) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/authority/getDetails", {
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
                    if (!canDonate(data.data.personLastDonated)) {
                        setButtonDisable(true);
                        setButtonText("60 DAYS NOT PASSED TO DONATE");
                    }
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    const incrementCount = () => {
        axios
            .post("/authority/incrementCount", {
                donateUser: person.id,
                donateAuthority: user.id,
                donateBlood: person.personBloodType,
            })
            .then(() => {
                setButtonDisable(true);
                setButtonText("SUCCESSFULLY INCREMENTED DONATED COUNT");
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
                        <h3>Donate Blood</h3>
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
                                                <label>Gender</label>
                                                <h6>{person.personGender}</h6>
                                                <hr />
                                            </div>
                                            <div className="col s6">
                                                <label>Doner Type</label>
                                                <h6>
                                                    {person.personDonerType}
                                                </h6>
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
                                        <div className="row">
                                            <div className="col s6">
                                                <label>Pin Code</label>
                                                <h6>{person.personPinCode}</h6>
                                                <hr />
                                            </div>
                                            <div className="col s6">
                                                <label>Taluka</label>
                                                <h6>{person.personTaluka}</h6>
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
                                                <label>Last Donated</label>
                                                <h6>
                                                    {person.personLastDonated ||
                                                        "NEVER"}
                                                </h6>
                                                <hr />
                                            </div>
                                        </div>
                                        <button
                                            onClick={incrementCount}
                                            className="btn right"
                                            disabled={buttonDisable}
                                        >
                                            {buttonText}
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
                                        <div className="title red-text center">
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
            </div>
        </main>
    );
};

export default DonateBlood;
