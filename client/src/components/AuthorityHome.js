import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import AuthorityDashboard from "./AuthorityDashboard";
import DonateBlood from "./DonateBlood";
import RequestBlood from "./RequestBlood";
import Requests from "./Requests";

const AuthorityHome = () => {
    const links = [
        {
            id: 1,
            name: "Dashboard",
            icon: "web",
        },
        {
            id: 2,
            name: "Volunteer Donation",
            icon: "opacity",
        },
        {
            id: 3,
            name: "Request Blood",
            icon: "hourglass_empty",
        },
        {
            id: 4,
            name: "Requests",
            icon: "hourglass_full",
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
            {tab === links[0].name && <AuthorityDashboard />}
            {tab === links[1].name && <DonateBlood />}
            {tab === links[2].name && <RequestBlood />}
            {tab === links[3].name && <Requests />}
            <Footer />
        </>
    );
};

export default AuthorityHome;
