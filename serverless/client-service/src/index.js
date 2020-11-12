'use strict';
const { SQS } = require('aws-sdk');
const config = require('../config');

const sqs = new SQS();

const sender = async (event) => {
  let statusCode = 200;
  let message;

  const body = JSON.parse(event.body);

  if (!body.email || !body.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Email or(and) message was not provided',
      }),
    };
  }

  const region = config.region;
  const accountId = config.accountId;
  const queueName = config.queueName;
  const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`

  try {
    await sqs.sendMessage({
      QueueUrl: queueUrl,
      MessageBody: event.body,
      MessageAttributes: {
        AttributeNameHere: {
          StringValue: 'Attribute Value Here',
          DataType: 'String',
        },
      },
    }).promise();

    message = 'Message placed in the Queue!';

  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

module.exports = sender;