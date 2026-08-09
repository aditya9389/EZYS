const newsProvider = require("../providers/news.provider");

exports.fetchNews = async (company) => {
    return await newsProvider.fetchCompanyNews(company);
};