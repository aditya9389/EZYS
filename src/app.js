const express = require("express");

const app = express();

const newsRoutes = require("./routes/news.routes");
const errorHandler = require("./middleware/error.middleware");

app.use("/news", newsRoutes);

app.use(errorHandler);

module.exports = app;