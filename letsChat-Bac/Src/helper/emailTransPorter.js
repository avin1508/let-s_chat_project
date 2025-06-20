const nodeMailer = require("nodemailer");

const transPorter = nodeMailer.createTransport({
     host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_ENABLED === 'true', 
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

module.exports = transPorter;