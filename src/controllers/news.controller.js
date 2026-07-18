exports.getNews = (req, res) => {
    const company = req.query.company;

    res.json({
        company,
        articles: [
            {
                title: `${company} launches something exciting`,
                source: "Dummy News",
                publishedAt: new Date()
            }
        ]
    });
};