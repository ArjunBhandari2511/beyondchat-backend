const transporter = require("../config/nodemailer");

const sendVerificationEmail = async (email, code) => {
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to : email,
        subject : "Email Verification Code",
        text : `Your email verification code is ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error Sending Email : ", error);
        } else {
            console.log("Email Sent : ", info.response);
        } 
});
};

module.exports = {sendVerificationEmail};