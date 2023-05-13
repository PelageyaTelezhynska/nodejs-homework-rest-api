const sgMail = require('@sendgrid/mail')

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY)

const email = {
  to: "",
  from: "p.yu.telezhynska@gmail.com",
  subject: "Test email",
  html: ""
}
sgMail.send(email)
  .then(() => console.log("Email send succes"))
  .catch(error => console.log(error.message))

  const sendEmail = async (data) => {
    const email = {...data, from: "p.yu.telezhynska@gmail.com"}
    await sgMail.send(email)
    return true;
  }

  module.exports = sendEmail