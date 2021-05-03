const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const Notifications = require("./Notification");

const Requests = db.define("Requests", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    reqAuthority: {
        type: Sequelize.STRING,
    },
    reqUser: {
        type: Sequelize.STRING,
    },
    reqFrom: {
        type: Sequelize.STRING,
    },
    reqUserName: {
        type: Sequelize.STRING,
    },
    reqFromName: {
        type: Sequelize.STRING,
    },
    reqFromContact: {
        type: Sequelize.STRING,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    reqBloodType: {
        type: Sequelize.STRING,
    },
});

module.exports = Requests;

module.exports.sendRequest = (obj) => {
    return new Promise((resolve, reject) => {
        Requests.findOne({
            where: {
                reqUser: obj.reqUser,
                reqFrom: obj.reqFrom,
                reqAuthority: obj.reqAuthority,
                active: true,
            },
        })
            .then((data) => {
                if (data === null) {
                    Requests.create(obj)
                        .then(() => {
                            Notifications.sendNotifications(obj)
                                .then((data) => {
                                    resolve({
                                        error: false,
                                        message: data.message,
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
                } else {
                    reject({
                        error: true,
                        message: "You already made the request",
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

module.exports.getRequests = (reqAuthority) => {
    return new Promise((resolve, reject) => {
        Requests.findAll({
            where: {
                reqAuthority,
            },
        })
            .then((data) => {
                if (data.length === 0) {
                    reject({
                        error: true,
                        message: "No Requests made",
                    });
                } else {
                    resolve({
                        error: false,
                        data,
                    });
                }
            })
            .catch();
    });
};

module.exports.deleteRequest = (obj) => {
    return new Promise((resolve, reject) => {
        Requests.findOne({
            where: {
                id: obj.id,
            },
        })
            .then((data) => {
                data.active = false;
                data.save()
                    .then((data) => {
                        Notifications.findAll({
                            where: {
                                fromUser: obj.reqFrom,
                                fromAuthority: obj.reqAuthority,
                                messageType: "doner",
                            },
                        })
                            .then((data) => {
                                let promiseArray = [];
                                for (var i = 0; i < data.length; i++) {
                                    data[i].active = false;
                                    promiseArray.push(data[i].save());
                                }
                                Promise.all(promiseArray)
                                    .then(() => {
                                        resolve({
                                            error: false,
                                            message: "Messages Deleted",
                                        });
                                    })
                                    .catch((e) => {
                                        reject({
                                            error: true,
                                            message: e.mesage,
                                        });
                                    });
                            })
                            .catch((e) => {
                                reject({
                                    error: true,
                                    message: e.mesage,
                                });
                            });
                    })
                    .catch((e) => {
                        reject({
                            error: true,
                            message: e.mesage,
                        });
                    });
            })
            .catch((e) => {
                reject({
                    error: true,
                    message: e.mesage,
                });
            });
    });
};
