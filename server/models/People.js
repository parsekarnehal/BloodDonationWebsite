const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");

const People = db.define("People", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    personFirstName: {
        type: Sequelize.STRING,
    },
    personLastName: {
        type: Sequelize.STRING,
    },
    personUsername: {
        type: Sequelize.STRING,
    },
    personLocation: {
        type: Sequelize.STRING,
    },
    personContact: {
        type: Sequelize.STRING,
    },
    personGender: {
        type: Sequelize.STRING,
    },
    personYear: {
        type: Sequelize.INTEGER,
    },
    personPassword: {
        type: Sequelize.STRING,
    },
    personState: {
        type: Sequelize.STRING,
    },
    personPinCode: {
        type: Sequelize.STRING,
    },
    personTaluka: {
        type: Sequelize.STRING,
    },
    personType: {
        type: Sequelize.STRING,
    },
    personBloodType: {
        type: Sequelize.STRING,
    },
    personCode: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    personDonerType: {
        type: Sequelize.STRING,
    },
    personLastDonated: {
        type: Sequelize.DATEONLY,
    },
});

module.exports = People;

module.exports.loginPeople = (personType, personUsername, personPassword) => {
    return new Promise((resolve, reject) => {
        People.findOne({
            where: {
                personType,
                personUsername,
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
                        personPassword,
                        data.personPassword,
                        (err, isMatch) => {
                            if (err) {
                                console.log(err);
                            }
                            if (isMatch) {
                                const user = {
                                    id: data.id,
                                    username: data.personUsername,
                                    name:
                                        data.personFirstName +
                                        " " +
                                        data.personLastName,
                                    userType: data.personType,
                                    userCode: data.personCode,
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

module.exports.registerPeople = (person) => {
    return new Promise((resolve, Reject) => {
        People.findOne({
            where: {
                personUsername: person.personUsername,
            },
        })
            .then((data) => {
                if (data == null) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(
                            person.personPassword,
                            salt,
                            (err, hash) => {
                                if (!err) {
                                    person.personPassword = hash;
                                    People.create(person)
                                        .then(() => {
                                            resolve({
                                                error: false,
                                                message:
                                                    "User Registered, Please Login.",
                                            });
                                        })
                                        .catch((e) => {
                                            throw Error(e);
                                        });
                                } else {
                                    throw Error(err);
                                }
                            }
                        );
                    });
                } else {
                    throw Error("User with the email already exists.");
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

module.exports.getPeopleByCode = (code, id) => {
    return new Promise((resolve, reject) => {
        People.findOne({
            where: {
                personCode: code,
                personType: "user",
            },
        })
            .then((data) => {
                if (data == null) {
                    reject({
                        error: true,
                        message: "No user exists with the provided code.",
                    });
                } else {
                    if (data.id === id) {
                        reject({
                            error: true,
                            message: "You have entered your own code.",
                        });
                    } else {
                        resolve({
                            error: false,
                            data,
                        });
                    }
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

module.exports.setLastDonatedDate = (id) => {
    return new Promise((resolve, reject) => {
        People.findOne({
            where: {
                id,
            },
        })
            .then((data) => {
                data.personLastDonated = new Date();
                data.save()
                    .then((data) => {
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            })
            .catch((e) => {
                reject(e);
            });
    });
};
