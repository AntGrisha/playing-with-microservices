'use strict';
const config = require('../config');

function buildSnsTopicParams(name, body) {
    return {
        Message: JSON.stringify(body),
        TopicArn: `arn:aws:sns:${config.region}:${config.accountId}:${name}`,
    };
}

module.exports = { buildSnsTopicParams };
