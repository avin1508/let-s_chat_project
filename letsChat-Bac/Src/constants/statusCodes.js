const statusCodes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,   // fixed key spelling
    UNPROCESSABLE_ENTITY: 422,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    BAD_GATEWAY: 502,
    NOT_IMPLEMENTED: 501,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
    NETWORK_CONNECT_TIMEOUT_ERROR: 599,
    NETWORK_READ_TIMEOUT_ERROR: 598,
    NETWORK_WRITE_TIMEOUT_ERROR: 597,
    NETWORK_SERVER_TIMEOUT_ERROR: 596,


};

module.exports = statusCodes;
