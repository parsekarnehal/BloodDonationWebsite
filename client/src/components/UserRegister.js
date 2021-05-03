import React, { useState, useEffect } from "react";
import axios from "axios";
import "materialize-css";
import { Select, RadioGroup, DatePicker } from "react-materialize";

const UserRegister = ({ registerSuccess }) => {
    const handleDate = (date) => {
        let dt;
        if (date == null) {
            dt = new Date();
        } else {
            dt = date;
        }
        return `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [personState, setPersonState] = useState("");
    const [personTaluka, setPersonTaluka] = useState("");
    const [personPinCode, setPersonPinCode] = useState("");
    const [personDonerType, setPersonDonerType] = useState("volunteer");
    const [personGender, setPersonGender] = useState("male");
    const [personYear, setPersonYear] = useState(handleDate(new Date()));
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [personBloodType, setPersonBloodType] = useState(1);
    const [bloodTypes, setBloodTypes] = useState([]);
    const [personContact, setPersonContact] = useState("");
    const [contactError, setContactError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === cPassword) {
            if (personContact.length === 10) {
                axios
                    .post("/user/userRegister", {
                        personFirstName: firstName,
                        personLastName: lastName,
                        personLocation: location,
                        personUsername: username,
                        personPassword: password,
                        personType: "user",
                        personGender,
                        personDonerType,
                        personBloodType,
                        personTaluka,
                        personPinCode,
                        personState,
                        personContact,
                        personYear: parseInt(personYear.split("-")[2]),
                    })
                    .then((response) => {
                        const data = response.data;
                        if (data.error) {
                            setEmailError(data.message);
                        } else {
                            registerSuccess(data.message);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                setContactError(true);
            }
        } else {
            setPasswordError(true);
        }
    };

    useEffect(() => {
        axios
            .get("/user/getBloodTypes")
            .then((response) => {
                setBloodTypes(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <main className="center verticalCenter userRegsiterForm">
            <div className="container">
                <div className="row">
                    <div className="col s9 offset-s1">
                        <div className="card card-login formFlex">
                            <div className="card-login-splash">
                                <div className="wrapper titlePadding">
                                    <h3>Blood Doner</h3>
                                    <h4>Website</h4>
                                </div>
                                <img
                                    className="loginRegImage"
                                    src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/geometric-cave.jpg?v=13127282243134125143"
                                    alt=""
                                />
                            </div>
                            <div className="card-content">
                                <span className="card-title">
                                    User Register
                                </span>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    type="text"
                                                    className="validate"
                                                    required
                                                    value={firstName}
                                                    onChange={(e) => {
                                                        setFirstName(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label htmlFor="name">
                                                    First Name
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    type="text"
                                                    className="validate"
                                                    required
                                                    value={lastName}
                                                    onChange={(e) => {
                                                        setLastName(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label htmlFor="name">
                                                    Last Name
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            className="validate"
                                            required
                                            value={location}
                                            onChange={(e) => {
                                                setLocation(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="location">
                                            Address
                                        </label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="number"
                                            className="validate"
                                            required
                                            value={personPinCode}
                                            onChange={(e) => {
                                                if (
                                                    e.target.value.length <= 6
                                                ) {
                                                    setPersonPinCode(
                                                        e.target.value
                                                    );
                                                }
                                            }}
                                        />
                                        <label htmlFor="location">
                                            Pin Code
                                        </label>
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    type="text"
                                                    className="validate"
                                                    required
                                                    value={personTaluka}
                                                    onChange={(e) => {
                                                        setPersonTaluka(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label htmlFor="location">
                                                    Taluka
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col s6">
                                            <div className="input-field">
                                                <input
                                                    type="text"
                                                    className="validate"
                                                    required
                                                    value={personState}
                                                    onChange={(e) => {
                                                        setPersonState(
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
                                            <label
                                                className="labelName"
                                                htmlFor="idBloodGroup"
                                            >
                                                Blood Group
                                            </label>
                                            <Select
                                                id="idBloodGroup"
                                                multiple={false}
                                                onChange={(e) => {
                                                    setPersonBloodType(
                                                        e.target.value
                                                    );
                                                }}
                                                options={{
                                                    classes: "",
                                                    dropdownOptions: {
                                                        alignment: "left",
                                                        autoTrigger: true,
                                                        closeOnClick: true,
                                                        constrainWidth: true,
                                                        coverTrigger: true,
                                                        hover: false,
                                                        inDuration: 150,
                                                        onCloseEnd: null,
                                                        onCloseStart: null,
                                                        onOpenEnd: null,
                                                        onOpenStart: null,
                                                        outDuration: 250,
                                                    },
                                                }}
                                            >
                                                {bloodTypes.map((e) => (
                                                    <option
                                                        key={e.id}
                                                        value={e.id}
                                                    >
                                                        {e.bloodType}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="col s6">
                                            <label
                                                className="labelName"
                                                htmlFor="idPersonType"
                                            >
                                                Person Type
                                            </label>
                                            <Select
                                                id="idPersonType"
                                                multiple={false}
                                                onChange={(e) => {
                                                    setPersonDonerType(
                                                        e.target.value
                                                    );
                                                }}
                                                options={{
                                                    classes: "",
                                                    dropdownOptions: {
                                                        alignment: "left",
                                                        autoTrigger: true,
                                                        closeOnClick: true,
                                                        constrainWidth: true,
                                                        coverTrigger: true,
                                                        hover: false,
                                                        inDuration: 150,
                                                        onCloseEnd: null,
                                                        onCloseStart: null,
                                                        onOpenEnd: null,
                                                        onOpenStart: null,
                                                        outDuration: 250,
                                                    },
                                                }}
                                                value={personDonerType}
                                            >
                                                <option value="volunteer">
                                                    Volunteer
                                                </option>
                                                <option value="paidDoner">
                                                    Paid Doner
                                                </option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="idGender"
                                            className="labelName"
                                        >
                                            Gender: &nbsp;
                                        </label>
                                        <RadioGroup
                                            id="idGender"
                                            label="Gender"
                                            name="gender"
                                            onChange={(e) => {
                                                setPersonGender(e.target.value);
                                            }}
                                            value={personGender}
                                            withGap
                                            options={[
                                                {
                                                    label: "Male",
                                                    value: "male",
                                                },
                                                {
                                                    label: "Female",
                                                    value: "female",
                                                },
                                                {
                                                    label: "Others",
                                                    value: "others",
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col s6 contactInput">
                                            <div className="input-field">
                                                <input
                                                    type="number"
                                                    className="validate"
                                                    required
                                                    value={personContact}
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value
                                                                .length <= 10
                                                        ) {
                                                            setPersonContact(
                                                                e.target.value
                                                            );
                                                            setContactError(
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="name">
                                                    Contact
                                                </label>
                                                {contactError && (
                                                    <span className="helper-text red-text">
                                                        Contact must be of
                                                        length 10
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col s6 birthLabel">
                                            <label
                                                htmlFor="idDatePicker"
                                                className="labelName"
                                            >
                                                Birth Date: &nbsp;
                                            </label>
                                            <DatePicker
                                                id="idDatePicker"
                                                value={personYear}
                                                onChange={(e) => {
                                                    setPersonYear(
                                                        handleDate(e)
                                                    );
                                                }}
                                                options={{
                                                    autoClose: false,
                                                    container: null,
                                                    defaultDate: null,
                                                    disableDayFn: null,
                                                    disableWeekends: false,
                                                    events: [],
                                                    firstDay: 0,
                                                    format: "dd-mm-yyyy",
                                                    i18n: {
                                                        cancel: "Cancel",
                                                        clear: "Clear",
                                                        done: "Ok",
                                                        months: [
                                                            "January",
                                                            "February",
                                                            "March",
                                                            "April",
                                                            "May",
                                                            "June",
                                                            "July",
                                                            "August",
                                                            "September",
                                                            "October",
                                                            "November",
                                                            "December",
                                                        ],
                                                        monthsShort: [
                                                            "Jan",
                                                            "Feb",
                                                            "Mar",
                                                            "Apr",
                                                            "May",
                                                            "Jun",
                                                            "Jul",
                                                            "Aug",
                                                            "Sep",
                                                            "Oct",
                                                            "Nov",
                                                            "Dec",
                                                        ],
                                                        nextMonth: "›",
                                                        previousMonth: "‹",
                                                        weekdays: [
                                                            "Sunday",
                                                            "Monday",
                                                            "Tuesday",
                                                            "Wednesday",
                                                            "Thursday",
                                                            "Friday",
                                                            "Saturday",
                                                        ],
                                                        weekdaysAbbrev: [
                                                            "S",
                                                            "M",
                                                            "T",
                                                            "W",
                                                            "T",
                                                            "F",
                                                            "S",
                                                        ],
                                                        weekdaysShort: [
                                                            "Sun",
                                                            "Mon",
                                                            "Tue",
                                                            "Wed",
                                                            "Thu",
                                                            "Fri",
                                                            "Sat",
                                                        ],
                                                    },
                                                    isRTL: false,
                                                    maxDate: null,
                                                    minDate: null,
                                                    onClose: null,
                                                    onDraw: null,
                                                    onOpen: null,
                                                    onSelect: null,
                                                    parse: null,
                                                    setDefaultDate: false,
                                                    showClearBtn: false,
                                                    showDaysInNextAndPreviousMonths: false,
                                                    showMonthAfterYear: false,
                                                    yearRange: 100,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="input-field cLeft">
                                        <input
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
                                            Username / Email
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
                                                    type="password"
                                                    className="validate"
                                                    required
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                        setPasswordError(false);
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
                                                    type="password"
                                                    className="validate"
                                                    required
                                                    value={cPassword}
                                                    onChange={(e) => {
                                                        setCPassword(
                                                            e.target.value
                                                        );
                                                        setPasswordError(false);
                                                    }}
                                                />
                                                <label htmlFor="cPassword">
                                                    Confirm Password
                                                </label>
                                                {passwordError && (
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

export default UserRegister;
