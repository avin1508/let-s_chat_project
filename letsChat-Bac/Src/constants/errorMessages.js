const errorMessages = {
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    TOO_MANY_REQUESTS: "Too many requests",  // fixed key spelling
    UNPROCESSABLE_ENTITY: "Unprocessable Entity",
    CONFLICT: "Conflict",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    SERVICE_UNAVAILABLE: "Service Unavailable",
    GATEWAY_TIMEOUT: "Gateway Timeout",
    BAD_GATEWAY: "Bad Gateway",
    NOT_IMPLEMENTED: "Not Implemented",
    NETWORK_AUTHENTICATION_REQUIRED: "Network Authentication Required",
    NETWORK_CONNECT_TIMEOUT_ERROR: "Network Connect Timeout Error",
    NETWORK_READ_TIMEOUT_ERROR: "Network Read Timeout Error",
    NETWORK_WRITE_TIMEOUT_ERROR: "Network Write Timeout Error",
    NETWORK_SERVER_TIMEOUT_ERROR: "Network Server Timeout Error",

    // Your app-specific messages
    EMAIL_REQUIRED: "Email is required",
    EMAIL_ALREADY_REGISTERED: "Email already registered and verified",
    PHONE_NUMBER_ALREADY_REGISTERED: "Phone number already registered and verified",

    // Optional extras you may add later
    OTP_EXPIRED: "OTP has expired",
    INVALID_OTP: "Invalid OTP",
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid credentials",
    EMAIL_NOT_VERIFIED: "Email not verified",

    TOKEN_EXPIRED: "Token has expired",
    TOKEN_INVALID: "Token is invalid",

    PASSWORD_MISMATCH: "Passwords do not match",
};

module.exports = errorMessages;
