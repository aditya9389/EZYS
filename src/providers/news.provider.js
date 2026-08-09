const axios = require("../config/axios");

function mapArticle(article) {
    return {
        title: article.title,
        description: article.description,
        author: article.author,
        source: article.source?.name ?? "Unknown",
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt
    };
}

exports.fetchCompanyNews = async (company) => {

    const response = await axios.get(
        "https://newsapi.org/v2/everything",
        {
            params: {
                q: company,
                apiKey: process.env.NEWS_API_KEY,
                language: "en",
                sortBy: "publishedAt",
                pageSize: 5
            }
        }
    );

    const articles = response.data.articles.map(mapArticle);

    return {
        company,
        totalArticles: articles.length,
        articles
    };
};