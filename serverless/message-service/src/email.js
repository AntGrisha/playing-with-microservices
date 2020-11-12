const email = async (event) => {
  const message = event.Records[0].Sns.Message;
  const jsonBody = JSON.parse(message);
  console.log(`Sending email to ${jsonBody.email} with message ${jsonBody.message}`);
};

module.exports = email;