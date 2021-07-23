const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const People = require("./People");

const BloodDonated = db.define("BloodDonated", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    donateDate: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date(),
    },
    donateUser: {
        type: Sequelize.STRING,
    },
    donateAuthority: {
        type: Sequelize.STRING,
    },
    donated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    donateBlood: {
        type: Sequelize.STRING,
    },
});

module.exports = BloodDonated;

module.exports.incrementBloodDonated = (obj) => {
    return new Promise((resolve, reject) => {
        BloodDonated.create(obj)
            .then(() => {
                People.setLastDonatedDate(obj.donateUser)
                    .then(() => {
                        resolve({
                            error: false,
                            message: "Blood Donated count incremented.",
                        });
                    })
                    .catch((e) => {
                        reject({
                            error: false,
                            message: "Blood Donated count increment failed",
                        });
                    });
            })
            .catch((e) => {
                reject({
                    error: false,
                    message: "Blood Donated count increment failed",
                });
            });
    });
};
