// utils/dateUtils.js

// Convert backend ISO/string → YYYY-MM-DD for form inputs
export const formatForForm = (val) => {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0]; // only YYYY-MM-DD
};

// Recursively format all date fields in an object
export const normalizeDatesForForm = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(normalizeDatesForForm);
    }

    if (obj && typeof obj === "object") {
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            if (["startDate", "endDate", "date"].includes(key)) {
                newObj[key] = formatForForm(value);
            } else {
                newObj[key] = normalizeDatesForForm(value);
            }
        }
        return newObj;
    }

    return obj;
};
