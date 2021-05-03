import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = ({ links = [], handleTabs }) => {
    const { isAuthenticated } = useSelector((state) => state.userAuth);

    return (
        <>
            {isAuthenticated && (
                <ul
                    id="sidenav-left"
                    className="sidenav sidenav-fixed sidenav-close"
                >
                    <li>
                        <Link to="#!" className="logo-container">
                            Blood Doner Website
                            <i className="material-icons left">spa</i>
                        </Link>
                    </li>
                    <li className="paddingTop">
                        <ul>
                            {links.map((el) => (
                                <li key={el.id}>
                                    <a
                                        onClick={() => {
                                            handleTabs(el.name);
                                        }}
                                        href="#!"
                                        className="sideBarOptions"
                                    >
                                        {el.name}
                                        <i className="material-icons">
                                            {el.icon}
                                        </i>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            )}
        </>
    );
};

export default SideBar;
