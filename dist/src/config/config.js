"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv").config();
exports.config = {
    test: {
        database: {
            connection: process.env.DB_CONECTION,
        },
        email: {
            port: process.env.PORT_EMAIL_TEST,
            host: process.env.HOST_EMAIL_TEST,
            email: process.env.USER_EMAIL_TEST,
            password: process.env.PASS_EMAIL_TEST,
            from: process.env.FROM_EMAIL_TEST
        },
        jwtSecret: process.env.JWTSECRET,
        jwtSecretPass: process.env.JWT_SECRET_PASS,
        // ipAPI: process.env.IP_API
    },
    development: {
        database: {
            connection: process.env.DB_CONECTION,
        },
        email: {
            port: process.env.PORT_EMAIL_DEVELOPMENT,
            host: process.env.HOST_EMAIL_DEVELOPMENT,
            email: process.env.USER_EMAIL_DEVELOPMENT,
            password: process.env.PASS_EMAIL_DEVELOPMENT,
            from: process.env.FROM_EMAIL_DEVELOPMENT
        },
        jwtSecret: process.env.JWTSECRET,
        jwtSecretPass: process.env.JWT_SECRET_PASS,
        // ipAPI: process.env.IP_API,
        // ip: process.env.IP
    },
    production: {
        databse: {
            connection: process.env.DB_CONECTION,
        },
        email: {
            port: '',
            host: '',
            email: '',
            password: ''
        },
        jwtSecret: process.env.JWTSECRET,
        jwtSecretPass: process.env.JWT_SECRET_PASS,
        ipAPI: process.env.IP_API
    }
};
//# sourceMappingURL=config.js.map