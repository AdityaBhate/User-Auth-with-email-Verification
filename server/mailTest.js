//test
transporter.verify((error, success) => {
	if (error) {
		console.log(error);
		console.log("failed to send mail");
	} else {
		console.log("mail success");
		console.log(success);
	}
});
