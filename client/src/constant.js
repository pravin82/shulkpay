let baseUrl = "";

if (process.env.NODE_ENV === "development") {
	baseUrl = "http://shulkpay.test:4000";
} else if (process.env.NODE_ENV === "production") {
	//baseUrl = "https://shulkpay.com/";
	baseUrl = "http://ec2-54-167-129-165.compute-1.amazonaws.com:4000"
} else {
	//baseUrl = "https://test.shulkpay.com";
	baseUrl = "http://ec2-54-167-129-165.compute-1.amazonaws.com:4000"

}

module.exports = {
	baseUrl
};
