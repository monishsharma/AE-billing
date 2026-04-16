export const performValidation = (validationObj) => {
        const updatedValidation = Object.keys(validationObj).reduce((acc, key) => {
            acc[key] = !!validationObj[key];
            return acc;
        }, {});

        return {
            isValid: Object.values(updatedValidation).every(Boolean),
            updatedValidation
        };
    };