import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AuthorityRegister from "./AuthorityRegister";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

const AdminHome = () => {
    const handleTabs = (tab) => {
        setTab(tab);
    };

    const links = [
        {
            id: 1,
            name: "Dashboard",
            icon: "web",
        },
        {
            id: 2,
            name: "Authority Register",
            icon: "account_box",
        },
    ];

    const [tab, setTab] = useState(links[0].name);

    return (
        <>
            <Header />
            <SideBar links={links} handleTabs={handleTabs} />
            {tab === links[0].name && <AdminDashboard />}
            {tab === links[1].name && <AuthorityRegister />}
            <Footer />
        </>
    );
};

export default AdminHome;
