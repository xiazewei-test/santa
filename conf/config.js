const config = require('./config.json');
const environment = process.env.NODE_ENV || 'development';
global.gConfig = config[environment];