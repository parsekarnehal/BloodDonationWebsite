import React, { useState } from "react";
import AddMembers from "./AddMembers";
import Footer from "./Footer";
import Header from "./Header";
import ListAuthority from "./listAuthorities";
import SideBar from "./SideBar";
import UserDashboard from "./UserDashboard";

const AuthorityHome = () => {
    const links = [
        {
            id: 1,
            name: "Dashboard",
            icon: "web",
        },
        {
            id: 2,
            name: "List Authorities",
            icon: "person_pin",
        },
        {
            id: 3,
            name: "Add Member",
            icon: "group_add",
        },
    ];

    const [tab, setTab] = useState(links[0].name);
    const handleTabs = (tab) => {
        setTab(tab);
    };

    return (
        <>
            <Header heading="Dashboard" />
            <SideBar links={links} handleTabs={handleTabs} />
            {tab === links[0].name && <UserDashboard />}
            {tab === links[1].name && <ListAuthority />}
            {tab === links[2].name && <AddMembers />}
            <Footer />
        </>
    );
};

export default AuthorityHome;
