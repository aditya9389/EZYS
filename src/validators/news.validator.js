function validateCompany(company) {
    if (!company || typeof company !== "string") {
        return "Company parameter is required.";
    }

    const trimmedCompany = company.trim();

    if (trimmedCompany === "") {
        return "Company parameter is required.";
    }

    if (/^\d+$/.test(trimmedCompany)) {
        return "Company name cannot contain only numbers.";
    }

    return null;
}

module.exports = {
    validateCompany
};