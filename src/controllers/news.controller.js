const newsService = require("../services/news.service");
const { validateCompany } = require("../validators/news.validator");

exports.getNews = async (req, res, next) => {
    const company = req.query.company;

    const validationError = validateCompany(company);

    if (validationError) {
        return res.status(400).json({
            error: validationError
        });
    }

    try {
        const news = await newsService.fetchNews(company);
        res.json(news);
    } catch (error) {
        next(error);
    }
};