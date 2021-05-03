import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoginForm from "./Login";
import SideBar from "./SideBar";
import UserRegister from "./UserRegister";

const SiteHome = () => {
    const [loginFor, setLoginFor] = useState("User");
    const [message, setMessage] = useState(null);

    const users = [
        {
            id: 1,
            type: "Admin",
        },
        {
            id: 2,
            type: "User",
        },
        {
            id: 3,
            type: "Authority",
        },
    ];

    const handleLoginFor = (type) => {
        setLoginFor(type);
    };

    const handleUserRegister = () => {
        setLoginFor("userRegister");
    };

    const registerSucess = (text) => {
        setLoginFor("User");
        setMessage(text);
    };

    return (
        <>
            <Header
                users={users}
                handleLoginFor={handleLoginFor}
                handleUserRegister={handleUserRegister}
            />
            <SideBar />
            {loginFor === users[0].type && (
                <LoginForm
                    title="Admin LogIn"
                    postUrl="/admin/adminLogin"
                    redirect="/admin/dashboard"
                />
            )}
            {loginFor === users[1].type && (
                <LoginForm
                    title="User LogIn"
                    postUrl="/user/userLogin"
                    redirect="/user/dashboard"
                    successMessage={message}
                />
            )}
            {loginFor === users[2].type && (
                <LoginForm
                    title="Authority LogIn"
                    postUrl="/authority/authorityLogin"
                    redirect="/authority/dashboard"
                />
            )}
            {loginFor === "userRegister" && (
                <UserRegister registerSuccess={registerSucess} />
            )}
            <Footer />
        </>
    );
};

export default SiteHome;
