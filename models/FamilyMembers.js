const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const People = require("./People");

const FamilyMemebers = db.define("FamilyMembers", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING,
    },
    memberId: {
        type: Sequelize.STRING,
    },
});

module.exports = FamilyMemebers;

module.exports.getFamilyMembers = (userId) => {
    return new Promise((resolve, reject) => {
        FamilyMemebers.findAll({
            where: {
                userId,
            },
        })
            .then((data) => {
                if (data.length === 0) {
                    reject({
                        error: true,
                        message: "No members exist",
                    });
                } else {
                    let promiseArray = [];
                    for (var i = 0; i < data.length; i++) {
                        var p = People.findOne({
                            where: {
                                id: data[i].memberId,
                            },
                        });
                        promiseArray.push(p);
                    }
                    Promise.all(promiseArray)
                        .then((data) => {
                            resolve({
                                error: false,
                                data,
                            });
                        })
                        .catch((e) => {
                            reject({
                                error: true,
                                message: e.message,
                            });
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
