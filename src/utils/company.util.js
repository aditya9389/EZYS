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