const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const People = require("./People");

const Authority = db.define("Authorities", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    authorityName: {
        type: Sequelize.STRING,
    },
    authorityLocation: {
        type: Sequelize.STRING,
    },
    authorityUsername: {
        type: Sequelize.STRING,
    },
    authorityState: {
        type: Sequelize.STRING,
    },
    authorityAdmin: {
        type: Sequelize.STRING,
    },
    authorityPinCode: {
        type: Sequelize.STRING,
    },
    authorityContact: {
        type: Sequelize.STRING,
    },
    authorityTaluka: {
        type: Sequelize.STRING,
    },
    authorityPassword: {
        type: Sequelize.STRING,
    },
});

module.exports = Authority;

module.exports.loginAuthority = (authorityUsername, authorityPassword) => {
    return new Promise((resolve, reject) => {
        Authority.findOne({
            where: {
                authorityUsername,
            },
        })
            .then((data) => {
                if (data == null) {
                    reject({
                        error: true,
                        message: "username",
                    });
                } else {
                    bcrypt.compare(
                        authorityPassword,
                        data.authorityPassword,
                        (err, isMatch) => {
                            if (err) {
                                console.log(err);
                            }
                            if (isMatch) {
                                const user = {
                                    id: data.id,
                                    username: data.authorityUsername,
                                    name: data.authorityName,
                                    userType: "authority",
                                };
                                resolve({
                                    error: false,
                                    message: "Login Successful",
                                    user,
                                });
                            } else {
                                reject({
                                    error: true,
                                    message: "password",
                                });
                            }
                        }
                    );
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

module.exports.registerAuthority = (authority) => {
    return new Promise((resolve, Reject) => {
        Authority.findOne({
            where: {
                authorityUserName: authority.authorityUsername,
            },
        })
            .then((data) => {
                if (data == null) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(
                            authority.authorityPassword,
                            salt,
                            (err, hash) => {
                                if (!err) {
                                    authority.authorityPassword = hash;
                                    Authority.create(authority)
                                        .then(() => {
                                            resolve({
                                                error: false,
                                                message: "Authority Registered",
                                            });
                                        })
                                        .catch((e) => {
                                            throw Error(err.message);
                                        });
                                } else {
                                    throw Error(err.message);
                                }
                            }
                        );
                    });
                } else {
                    throw Error("Authority with the email already exists.");
                }
            })
            .catch((e) => {
                Reject({
                    error: true,
                    message: e.message,
                });
            });
    });
};

module.exports.getAuthoritiesList = (id) => {
    return new Promise((resolve, reject) => {
        People.findOne({
            where: {
                id,
            },
        })
            .then((data) => {
                const { personState, personPinCode, personTaluka } = data;
                Authority.findAll({
                    where: {
                        authorityPinCode: personPinCode,
                    },
                })
                    .then((data) => {
                        var dataArray = [];
                        if (data.length === 0) {
                            Authority.findAll({
                                where: {
                                    authorityTaluke: personTaluka,
                                },
                            })
                                .then((data) => {
                                    if (data.length === 0) {
                                        Authority.findAll({
                                            where: {
                                                authorityState: personState,
                                            },
                                        })
                                            .then((data) => {
                                                if (data.length === 0) {
                                                    reject({
                                                        error: true,
                                                        message:
                                                            "No Authorities found in your state.",
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
            })
            .catch((e) => {
                reject({
                    error: true,
                    message: e.message,
                });
            });
    });
};
