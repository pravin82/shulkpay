const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = (module.exports = express());

global.__base = __dirname + "/";
const session = require(`${__base}/database/session`);
const db = require(`${__base}/database/mysql`);
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
const PORT = process.env.npm_package_config_port || 4000;
const API_PORT = 3001;
const apiRouter = require(`${__base}/routes/router`);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,

}
app.use(cors(corsOptions));

app.use(session());
app.disable("view cache");
app.locals.host = "http://shulkpay.test:8080/";
app.use(apiRouter);



db.connect(null, err => {
	if (err) {
		console.log("Unable to connect to MySQL.");
		process.exit(1);
	} else {
		app.listen(PORT, async () => {
			console.log("App listening started at port " + PORT);
		});
	}
});


app.use((req, res) => {
	return res
		.status(404)
		.send("<h1>Sorry! The path does not exist.</h1>")
		.end();
});
