const AWS = require('aws-sdk');
const moment = require('moment');
const config = require('../config');
const { buildSnsTopicParams } = require('./utils');
const sns = new AWS.SNS();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const consumer = async (event) => {
  try {
    for (const record of event.Records) {
      console.log('Processing Message Body -->  ', record.body);
      const jsonBody = JSON.parse(record.body);
      const snsRequests = [];
      const { email, phone, message } = jsonBody;
      const lastSeen = moment().utc().toISOString();

      await dynamoDb.update({
        TableName: config.dynamoTable,
        Key: { email },
        UpdateExpression: 'SET phone = :phone, lastSeen = :lastSeen',
        ExpressionAttributeValues: {
          ':phone': phone || 'not specified',
          ':lastSeen': lastSeen,
        },
      }).promise();

      // TODO: Message broker logic
      const emailTopicBody = { email, message };
      const emailTopicParams = buildSnsTopicParams(config.snsTopicEmails, emailTopicBody);
      snsRequests.push(sns.publish(emailTopicParams).promise());

      if (jsonBody.phone) {
        const smsTopicBody = { phone, message };
        const smsTopicParams = buildSnsTopicParams(config.snsTopicSMS, smsTopicBody);
        snsRequests.push(sns.publish(smsTopicParams).promise());
      }

      await Promise.all(snsRequests);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = consumer;
