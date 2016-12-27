var config = require('config');
var dbConfig = config.get('mongo.raw');

console.log(typeof config.get('redis'));

