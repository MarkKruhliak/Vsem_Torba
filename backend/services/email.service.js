const nodemailer = require('nodemailer')
const emailTemplates = require('email-templates')
const emailTemplateObj = require('../email-templates/index')
const path = require("path");

const sendEmail = async (userMail, forgotPass, locals = {}, token, user) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NO_REPEAT_EMAIL,
            pass: process.env.NO_REPEAT_PASS
        }
    })

    const templateParser = new emailTemplates({
        views: {root: path.join(process.cwd(), 'email-templates')}
    })

    const emailInfo = emailTemplateObj[forgotPass]


    const html = await templateParser.render(emailInfo.templateName, {
        ...locals,
        frontendUrl: `http://localhost:3000/forgot-pass?token=${token}&id=${user}`
    })

    return transporter.sendMail({
        from: 'Vsem Torba',
        to: userMail,
        subject: emailInfo.subject,
        html: html
    })
}

module.exports = {
    sendEmail
}
