const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const FamilyMemebers = require("./FamilyMembers");
const Authority = require("./Authority");
const People = require("./People");

const Notifications = db.define("Notifications", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    fromUser: {
        type: Sequelize.STRING,
    },
    toUser: {
        type: Sequelize.STRING,
    },
    message: {
        type: Sequelize.STRING,
    },
    fromUserName: {
        type: Sequelize.STRING,
    },
    messageType: {
        type: Sequelize.STRING,
    },
    fromAuthority: {
        type: Sequelize.STRING,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Notifications;

module.exports.sendRequest = (obj) => {
    return new Promise((resolve, reject) => {
        Notifications.findOne({
            where: {
                toUser: obj.toUser,
                fromUser: obj.fromUser,
                active: true,
            },
        })
            .then((data) => {
                if (data === null) {
                    Notifications.create(obj)
                        .then(() => {
                            resolve({
                                error: false,
                                message: "Notification sent.",
                            });
                        })
                        .catch((e) => {
                            reject({
                                error: true,
                                message: e.message,
                            });
                        });
                } else {
                    reject({
                        error: true,
                        message: "Already request sent to the user",
                    });
                }
            })
            .catch((e) => {
                reject({
                    error: true,
                    message: e.message,
                });
            });
    });
};

module.exports.getNotifications = (toUser) => {
    return new Promise((resolve, reject) => {
        Notifications.findAll({
            where: {
                toUser,
                active: true,
            },
        })
            .then((data) => {
                if (data.length === 0) {
                    reject({
                        error: true,
                        message: "No Notifications.",
                    });
                } else {
                    resolve({
                        error: false,
                        data,
                    });
                }
            })
            .catch((e) => {
                reject({
                    error: true,
                    message: e.message,
                });
            });
    });
};

module.exports.dismissNotification = (id) => {
    return new Promise((resolve, reject) => {
        Notifications.findOne({
            where: {
                id,
            },
        })
            .then((data) => {
                data.active = false;
                data.save()
                    .then((data) => {
                        resolve({
                            error: false,
                        });
                    })
                    .catch((e) => {
                        reject({
                            error: true,
                            message: e.message,
                        });
                    });
            })
            .catch((e) => {
                reject({
                    error: true,
                    message: e.message,
                });
            });
    });
};

module.exports.accceptRequest = (obj) => {
    return new Promise((resolve, reject) => {
        FamilyMemebers.create({
            userId: obj.fromUser,
            memberId: obj.toUser,
        })
            .then((data) => {
                resolve({
                    error: false,
                    message: "Request accepted",
                });
            })
            .catch((e) => {
                reject({
                    error: true,
                    message: e.message,
                });
            });
    });
};

module.exports.sendNotifications = (obj) => {
    return new Promise((resolve, reject) => {
        Authority.findOne({
            where: {
                id: obj.reqAuthority,
            },
        })
            .then((authority) => {
                People.findAll({
                    where: {
                        personBloodType: obj.reqBloodType,
                        personState: authority.authorityState,
                    },
                })
                    .then((statePerson) => {
                        let personArray = statePerson.filter(
                            (el) => el.id != obj.reqUser
                        );
                        let promiseArray = [];
                        for (var i = 0; i < personArray.length; i++) {
                            var p = Notifications.create({
                                toUser: personArray[i].id,
                                fromUser: obj.reqFrom,
                                fromAuthority: authority.id,
                                fromUserName: authority.authorityName,
                                messageType: "doner",
                                message: "Blood Emergency",
                            });
                            promiseArray.push(p);
                        }
                        Promise.all(promiseArray)
                            .then(() => {
                                resolve({
                                    error: false,
                                    message:
                                        "Messages Sent to " +
                                        personArray.length +
                                        " people",
                                });
                            })
                            .catch((e) => {
                                reject({
                                    error: true,
                                    message: e.message,
                                });
                            });
                    })
                    .catch((e) => {
                        reject({
                            error: true,
                            message: e.message,
                        });
                    });
            })
            .catch((e) => {
                reject({
                    error: true,
                    message: e.message,
                });
            });
    });
};
