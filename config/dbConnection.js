const { Sequelize } = require("sequelize");

const connectDb = new Sequelize("todo_node", "root", "1234", {
    host: "localhost",
    dialect: "mysql", 
});

connectDb.authenticate()
    .then(() => console.log("MySQL connected using Sequelize!"))
    .catch((err) => console.error("MySQL connection failed:", err));

module.exports = connectDb;