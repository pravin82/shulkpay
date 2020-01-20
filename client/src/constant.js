let baseUrl = "";

if (process.env.NODE_ENV === "development") {
	baseUrl = "http://shulkpay.test:4000";
} else if (process.env.NODE_ENV === "production") {
	baseUrl = "https://shulkpay.com/";
} else {
	baseUrl = "https://test.shulkpay.com";
}

module.exports = {
	baseUrl
};
