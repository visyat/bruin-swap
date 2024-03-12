import hbs from 'nodemailer-express-handlebars';
import nodeMailer from 'nodemailer';
import path from 'path';

import dotenv from 'dotenv'
dotenv.config()

var transporter = nodeMailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
    }
});
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

const notification = (request) => {
    const {user_name, user_email, user_class} = request;
    transporter.use('compile', hbs(handlebarOptions));
    const mailOptions = {
        from: '"Bruin Swap" <vishalyathish01@gmail.com>',
        template: "email",
        to: user_email,
        subject: `BruinSwap: Class on Your Wishlist Available!`,
        context: {
            name: user_name,
            class: user_class
        },
    };
    try {
        transporter.sendMail(mailOptions);
        //response.status(200).json({ msg: `MESSAGE SENT TO ${user_email}` })
    } catch (error) {
        const response = json({ msg: `NODEMAILER ERROR SENDING TO ${user_email}`});
    }
}

export {
    notification
}