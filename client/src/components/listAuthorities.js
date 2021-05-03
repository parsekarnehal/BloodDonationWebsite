import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ListAuthority = () => {
    const [authorityList, setAuthorityList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useSelector((state) => state.userAuth);

    useEffect(() => {
        axios
            .get("/user/getAuthoritiesList/" + user.id)
            .then((response) => {
                if (response.data.error) {
                    setErrorMessage(response.data.message);
                } else {
                    setAuthorityList(response.data.data);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    return (
        <main className="mainContainer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Authorities List</h3>
                    </div>
                </div>
                <div>
                    {authorityList.length === 0 ? (
                        <div className="title center red-text">
                            {errorMessage}
                        </div>
                    ) : (
                        <ul className="collection">
                            {authorityList.map((el) => (
                                <li
                                    className="collection-item avatar"
                                    key={el.id}
                                >
                                    <i className="material-icons circle listIcon">
                                        local_hospital
                                    </i>
                                    <span className="title">
                                        {el.authorityName}
                                    </span>
                                    <p>{el.authorityLocation}</p>
                                    <p>{el.authorityTaluka}</p>
                                    <a href="#!" className="secondary-content">
                                        <i className="material-icons contactIcon">
                                            call
                                        </i>
                                        <div className="black-text">
                                            {" " + el.authorityContact + " "}
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

export default ListAuthority;
