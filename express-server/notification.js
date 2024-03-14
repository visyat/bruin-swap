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

const notifyWishlistTransaction = (request) => {
    const {user_name, user_email, user_class} = request;
    transporter.use('compile', hbs(handlebarOptions));
    const mailOptions = {
        from: `"Bruin Swap" <${process.env.MAIL_ADDRESS}>`,
        template: "wishlist",
        to: user_email,
        subject: `BruinSwap: Class on Your Wishlist Available!`,
        context: {
            name: user_name,
            class: user_class
        },
    };
    try {
        transporter.sendMail(mailOptions);
    } catch (error) {
        const response = json({ msg: `NODEMAILER ERROR SENDING TO ${user_email}`});
    }
}
const notifyRequestTransaction = (request) => {
    const {poster_name, poster_email, class_want, class_drop, requester_name, requester_email} = request; 
    transporter.use('compile', hbs(handlebarOptions));
    const mailOptions = {
        from: `"Bruin Swap" <${process.env.MAIL_ADDRESS}>`,
        template: "request",
        to: poster_email,
        subject: `BruinSwap: Someone Requested Your Transaction!`,
        context: {
            poster_name: poster_name,
            class_want: class_want,
            class_drop: class_drop,
            requester_name: requester_name, 
            requester_email: requester_email
        },
    };
    try {
        transporter.sendMail(mailOptions);
    } catch (error) {
        const response = json({ msg: `NODEMAILER ERROR SENDING TO ${user_email}`});
    }
}
const notifyRejectRequest = (request) => {
    const {t_class, requester_name, requester_email} = request; 
    transporter.use('compile', hbs(handlebarOptions));
    const mailOptions = {
        from: `"Bruin Swap" <${process.env.MAIL_ADDRESS}>`,
        template: "request",
        to: requester_email,
        subject: `BruinSwap: Your Request Was Rejected`,
        context: {
            requester_name: requester_name, 
            class: t_class, 
        },
    };
    try {
        transporter.sendMail(mailOptions);
    } catch (error) {
        const response = json({ msg: `NODEMAILER ERROR SENDING TO ${user_email}`});
    }
}
const notifyAcceptRequest = (request) => {
    const {poster_name, poster_email, t_class, requester_name, requester_email} = request; 
    transporter.use('compile', hbs(handlebarOptions));
    const mailOptions = {
        from: `"Bruin Swap" <${process.env.MAIL_ADDRESS}>`,
        template: "request",
        to: requester_email,
        subject: `BruinSwap: Your Request Was Approved!`,
        context: {
            requester_name: requester_name,
            class: t_class, 
            poster_name: poster_name,
            poster_email: poster_email
        },
    };
    try {
        transporter.sendMail(mailOptions);
    } catch (error) {
        const response = json({ msg: `NODEMAILER ERROR SENDING TO ${user_email}`});
    }
}

export {
    notifyWishlistTransaction,
    notifyRequestTransaction, 
    notifyRejectRequest, 
    notifyAcceptRequest
}