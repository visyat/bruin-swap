import hbs from 'nodemailer-express-handlebars';
import nodeMailer from 'nodemailer';

const address = new TempMail("bruinSwap");


/*var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'your_email@gmail.com',
        pass: 'password_for_your_email_address'
    }
});*/


/*
const mailgun = new mailGun(formData);

const mg = mailgun.client
({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
});

exports.sendMail = (req, res) => {
const { toEmail, fromEmail, subject, message } = req.body;

mg.messages.create(process.env.MAILGUN_DOMAIN, {
from: fromEmail,
to: [toEmail],
subject: subject,
text: message,
});
};*/