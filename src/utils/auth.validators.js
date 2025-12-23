/**
    * functions to validate user input
    * @param {string} 
    * @returns {status: boolean, message: string}
*/

export const validate = {
    email: (email) => {
        const trimmedEmail = email ? email.trim() : "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail) {
            return { status: false, message: "Email is required" };
        }
        if (!emailRegex.test(trimmedEmail)) {
            return { status: false, message: "Please enter a valid email address" };
        }
        return { status: true, message: "" };
    },

    phone: (phone) => {
        const trimmedPhone = phone ? phone.trim() : "";
        const phoneRegex = /^\d{10}$/;
        if (!trimmedPhone) {
            return { status: false, message: "Phone number is required" };
        }
        if (!phoneRegex.test(trimmedPhone)) {
            return { status: false, message: "Phone number must be exactly 10 digits" };
        }
        return { status: true, message: "" };
    },

    fullName: (name) => {
        const trimmedName = name ? name.trim() : "";
        if (!trimmedName) {
            return { status: false, message: "Full name is required" };
        }

        // Allows alphabets and spaces, ensuring at least one space between parts
        const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)+$/;
        if (!nameRegex.test(trimmedName)) {
            return { status: false, message: "Please enter a valid full name (First Last)" };
        }
        return { status: true, message: "" };
    },

    password: (password) => {
        if (!password) {
            return { status: false, message: "Password is required" };
        }
        if (password.length < 6) {
            return { status: false, message: "Password must be greater than 6 characters" };
        }
        return { status: true, message: "" };
    }
};