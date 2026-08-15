const newsProvider = require("../providers/news.provider");

const TARGET_ARTICLES = 5;
const MAX_PAGES = 3;

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

    const relevantArticles = [];
    const existingUrls = new Set();

    for (let page = 1; page <= MAX_PAGES; page++) {

        const news = await newsProvider.fetchCompanyNews(
            company,
            page
        );

        const filteredArticles = news.articles.filter(article =>
            isRelevantArticle(article, aliases)
        );

        for (const article of filteredArticles) {
            if (!existingUrls.has(article.url)) {
                existingUrls.add(article.url);
                relevantArticles.push(article);
            }
        }

        if (relevantArticles.length >= TARGET_ARTICLES) {
            break;
        }

        if (news.articles.length === 0) {
            break;
        }
    }

    const articles = relevantArticles.slice(0, TARGET_ARTICLES);

    return {
        company,
        totalArticles: articles.length,
        articles
    };
};