const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const Blood = db.define("Blood", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    bloodType: {
        type: Sequelize.STRING,
    },
});

module.exports = Blood;

module.exports.getAllTypes = () => {
    return new Promise((resolve, reject) => {
        Blood.findAll()
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
    });
};
