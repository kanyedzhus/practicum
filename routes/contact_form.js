// needed to access email credentials
require("dotenv").config();
const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

// this sets up the SMTP (transfer protocol) needed by email hosts to send the message
// gmail not ideal for use with nodemailer. Needed special App password from my gmail acct
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

// the connection is verified here
transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to receive messages.");
	}
});

// route for email is post. This will send the content of the contact form.
router.post("/contact", (req, res) => {
	const { full_name, organization, email, phone, message } = req.body;
	console.log(req.body);

	// this  mail object has the contents of the email.
	const mail = {
		from: full_name,
		to: "dktbootcamp@gmail.com",
		subject: `Submission from ${full_name} at ${organization}`,
		html: `<p>Email: ${email} || Phone: ${phone}</p> 
					<p>${message}<p/>`,
	};

	// function sends the email
	transporter.sendMail(mail, (error, info) => {
		if (error) {
			console.log(info);
			res.json({ error: error });
		} else {
			console.log(info);
			res.json({ success: "Message Sent" });
		}
	});
});

module.exports = router;
