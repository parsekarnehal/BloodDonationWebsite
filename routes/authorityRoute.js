const router = require("express").Router();
const Authority = require("../models/Authority");
const People = require("../models/People");
const BloodDonated = require("../models/BloodDonated");
const Requests = require("../models/Request");

router.route("/authorityLogin").post((req, res) => {
    const { username, password } = req.body;
    Authority.loginAuthority(username, password)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.route("/getDetails").post((req, res) => {
    const { code, id } = req.body;
    People.getPeopleByCode(code, id)
        .then((response) => {
            res.json(response);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/incrementCount").post((req, res) => {
    BloodDonated.incrementBloodDonated(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/sendRequest").post((req, res) => {
    Requests.sendRequest(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/getRequests/:id").get((req, res) => {
    const id = req.params.id;
    Requests.getRequests(id)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/deleteRequest").post((req, res) => {
    Requests.deleteRequest(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

module.exports = router;
