const express = require("express");

const app = express();

const newsRoutes = require("./routes/news.routes");

app.use("/news", newsRoutes);

module.exports = app;