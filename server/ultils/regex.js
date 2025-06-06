const myRegex = {
    fullnameRegex: {
        pattern: /^[a-zA-Z\s]{3,40}$/,
        message: "Full name must be 3-40 characters long and contain only letters and spaces",
        shortMessage: "Invalid full name"
    },
    usernameRegex: {
        pattern: /^[a-zA-Z0-9_-]{3,20}$/,
        message: "Username must be 3-20 characters long and contain only letters, numbers, underscores, or hyphens",
        shortMessage: "Invalid username"
    },
    emailRegex: {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email must be a valid email address (e.g., user@example.com)",
        shortMessage: "Invalid email"
    },
    passwordRegex: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Password must be at least 6 characters long, include uppercase, lowercase, number, and special character",
        shortMessage: "Weak password"
    }
};

export { myRegex };
