var nodemailer = require("nodemailer");

let exportedMethods = {
    async sentmail(req, res) {

        let sendtext = "Dear " + req.name + "\n Your Order is placed successfully. \n Thank you for ordering. Visit again."
        var transporter = nodemailer.createTransport({

            service: 'gmail', //smtp.gmail.com  //in place of service use host...
            secure: false, //true
            port: 25, //465
            auth: {
                user: 'sujaysalvifooddeliveryproject@gmail.com',
                pass: 'sujaysalvi@2019'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'sujaysalvifooddeliveryproject@gmail.com', // sender address
            to: req.emailId, // list of receivers
            subject: 'Order Confirmation', // Subject line
            html: '<p>' + sendtext + '</p>' // plain text body
        };

        transporter.sendMail(mailOptions);
    },
    async sentmail1(req, res) {

        let sendtext = "Dear " + req.body.name + "\n has now created an account."
        var transporter = nodemailer.createTransport({

            service: 'gmail', //smtp.gmail.com  //in place of service use host...
            secure: false, //true
            port: 25, //465
            auth: {
                user: 'sujaysalvifooddeliveryproject@gmail.com',
                pass: 'sujaysalvi@2019'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'sujaysalvifooddeliveryproject@gmail.com', // sender address
            to: req.body.emailId, // list of receivers
            subject: 'Registeration Successful!', // Subject line
            html: '<p>' + sendtext + '</p>' // plain text body
        };

        transporter.sendMail(mailOptions);
    }
}
module.exports = exportedMethods;