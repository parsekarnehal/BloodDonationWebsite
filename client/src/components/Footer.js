import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
    const year = new Date().getFullYear();
    const { isAuthenticated } = useSelector((state) => state.userAuth);

    return (
        <>
            <footer className="page-footer">
                <div
                    className="footerContent"
                    style={
                        isAuthenticated
                            ? { marginLeft: "20rem" }
                            : { marginLeft: 0 }
                    }
                >
                    <div className="black-text center">© {year} PL405</div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
