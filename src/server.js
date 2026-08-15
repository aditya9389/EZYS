require("dotenv").config();

const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
    console.log(`EZYS server running on port ${port}`);
});

const pool = require("./config/database");

pool.query("SELECT NOW()", (error, result) => {
    if (error) {
        console.error("Database connection failed:", error);
        return;
    }

    console.log("Database connected:", result.rows[0]);
});