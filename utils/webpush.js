const webpush = require("web-push");
const config = require('../configuration/config')


webpush.setVapidDetails(
  "mailto:test@faztweb.com",
  config.publicKey,
  config.privateKey
);

console.log('Webpush Back')
module.exports = webpush;