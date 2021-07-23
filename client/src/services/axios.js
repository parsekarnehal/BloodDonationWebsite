import axios from "axios";

export default axios.create({
    baseURL: "https://blooddonationwebsite.herokuapp.com",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
