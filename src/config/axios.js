const axios = require("axios");

const axiosInstance = axios.create({
    timeout: 10000
});

module.exports = axiosInstance;