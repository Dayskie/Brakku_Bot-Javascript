///node start.js
require('babel-register')({
    presets: ['env']
});
// Assuming your starting point is index.js
module.exports = require('./index.js')