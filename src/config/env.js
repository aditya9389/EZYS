const requiredEnvVariables = [
    "NEWS_API_KEY",
    "DATABASE_URL"
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`${variable} is not configured.`);
    }
}

module.exports = {
    port: process.env.PORT || 3000,
    newsApiKey: process.env.NEWS_API_KEY,
    databaseUrl: process.env.DATABASE_URL
};