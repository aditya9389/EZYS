const newsService = require("../services/news.service");

exports.getNews = async (req, res) => {
    try {
        const company = req.query.company;

        if (!company || company.trim() === "") {
            return res.status(400).json({
                error: "Company parameter is required."
            });
        }

        if (/^\d+$/.test(company)) {
            return res.status(400).json({
                error: "Company name cannot contain only numbers."
            });
        }

        const news = await newsService.fetchNews(company);

        res.json(news);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong."
        });
    }
};