let baseUrl = "";

if (process.env.NODE_ENV === "development") {
	baseUrl = "http://shulkpay.test:4000";
} else if (process.env.NODE_ENV === "production") {
	baseUrl = "http://www.shulkpay.com:4000";
	//baseUrl = "http://ec2-3-83-101-88.compute-1.amazonaws.com:4000"
} else {
	//baseUrl = "http://test.shulkpay.com";
	//baseUrl = "http://ec2-3-83-101-88.compute-1.amazonaws.com:4000"

}

module.exports = {
	baseUrl
};
