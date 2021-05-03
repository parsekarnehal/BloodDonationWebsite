const router = require("express").Router();
const People = require("../models/People");
const Blood = require("../models/Blood");
const Authority = require("../models/Authority");
const FamilyMemebers = require("../models/FamilyMembers");
const Notifications = require("../models/Notification");

router.route("/userRegister").post((req, res) => {
    People.registerPeople(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/getBloodTypes").get((req, res) => {
    Blood.getAllTypes()
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.json(error.message);
        });
});

router.route("/userLogin").post((req, res) => {
    const { username, password } = req.body;

    People.loginPeople("user", username, password)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.route("/getAuthoritiesList/:id").get((req, res) => {
    const id = req.params.id;
    Authority.getAuthoritiesList(id)
        .then((response) => {
            res.json(response);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/getMembers/:id").get((req, res) => {
    const id = req.params.id;
    FamilyMemebers.getFamilyMembers(id)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/sendMessage").post((req, res) => {
    Notifications.sendRequest(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/getNotifications/:id").get((req, res) => {
    const id = req.params.id;
    Notifications.getNotifications(id)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/dismissNotification").post((req, res) => {
    const id = req.body.id;
    Notifications.dismissNotification(id)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.route("/accceptRequest").post((req, res) => {
    Notifications.accceptRequest(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

module.exports = router;
