import { readUserOne } from "@/server/DL/controllers/user.controller";

export const isExist = async (email) => {
    const existingUser = await readUserOne({ email });
    if (existingUser && existingUser.isActive) {
        throw new Error("משתמש קיים");
    }
    return existingUser;
};


export const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validPassword = (password) => {
    if (password.length < 6 || password.length > 12) {
        throw new Error("Password must be between 6 and 12 characters.");
    }

    // Make sure at least one letter is present
    if (!hasEnglishLetter(password)) {
        throw new Error("Password must contain at least one letter.");
    }

    // Make sure at least one digit is present
    if (!hasDigit(password)) {
        throw new Error("Password must contain at least one digit.");
    }

    // Make sure there are no characters other than English letters and numbers
    if (!isAlphanumeric(password)) {
        throw new Error("Password must contain only English letters and numbers.");

    }

    return true;
}

const hasDigit = (str) => {
    return /\d/.test(str);
}

const hasEnglishLetter = (str) => {
    return /[a-zA-Z]/.test(str);
}

const isAlphanumeric = (str) => {
    return /^[a-zA-Z0-9]+$/.test(str);
}
