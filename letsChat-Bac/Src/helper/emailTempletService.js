const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const AppError = require('../errors/appError');
const statusCodes = require('../constants/statusCodes')


const renderTemplets = async (template, data) => {
    try {
        const filePath = path.join(__dirname, '../templates', `${template}.hbs`);  
        const source = fs.readFileSync(filePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        return compiledTemplate(data);
    } catch (error) {
        throw new AppError(error.message, statusCodes.INTERNAL_SERVER_ERROR); 
    }
}

module.exports = renderTemplets