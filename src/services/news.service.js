const newsProvider = require("../providers/news.provider");

function getCompanyAliases(company) {
    const normalizedCompany = company.trim();

    const aliases = [normalizedCompany];

    if (normalizedCompany.includes(" ")) {
        const shortName = normalizedCompany
            .split(/\s+/)
            .map(word => word[0])
            .join("");

        aliases.push(shortName);
    }

    return aliases;
}

function isRelevantArticle(article, aliases) {
    const text = `
        ${article.title || ""}
        ${article.description || ""}
    `.toLowerCase();

    return aliases.some(alias =>
        text.includes(alias.toLowerCase())
    );
}

exports.fetchNews = async (company) => {
    const aliases = getCompanyAliases(company);

    const news = await newsProvider.fetchCompanyNews(company);

    const relevantArticles = news.articles.filter(article =>
        isRelevantArticle(article, aliases)
    );

    return {
        company: news.company,
        totalArticles: relevantArticles.length,
        articles: relevantArticles
    };
};