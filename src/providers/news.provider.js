const axios = require("../config/axios");

function mapArticle(article, company) {
    return {
        title: article.title,
        description: article.description,
        author: article.author,
        source: article.source?.name ?? "Unknown",
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
        company
    };
}

exports.fetchCompanyNews = async (company, page = 1) => {

    const response = await axios.get(
        "https://newsapi.org/v2/everything",
        {
            params: {
                q: company,
                apiKey: process.env.NEWS_API_KEY,
                language: "en",
                sortBy: "publishedAt",
                pageSize: 5,
                page
            }
        }
    );

    const articles = response.data.articles.map(
        article => mapArticle(article, company)
    );

    return {
        company,
        totalArticles: articles.length,
        articles
    };
};