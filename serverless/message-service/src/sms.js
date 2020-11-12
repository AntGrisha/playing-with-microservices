const sms = async (event) => {
  const message = event.Records[0].Sns.Message;
  const jsonBody = JSON.parse(message);
  console.log(`Sending sms to ${jsonBody.phone} with message ${jsonBody.message}`);
};

module.exports = sms;