const email = require('./src/email');
const sms = require('./src/sms');
module.exports = {
    emailSend: email,
    smsSend: sms
};