const router = require("express").Router();
const People = require("../models/People");
const Authority = require("../models/Authority");

router.route("/authorityRegister").post((req, res) => {
    Authority.registerAuthority(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/adminLogin").post((req, res) => {
    const { username, password } = req.body;

    People.loginPeople("admin", username, password)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;
