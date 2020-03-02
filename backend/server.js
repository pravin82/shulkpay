const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = (module.exports = express());
const path = require('path')
const cookieParser = require('cookie-parser')



global.__base = __dirname + "/";
const session = require(`${__base}/database/session`);
const db = require(`${__base}/database/mysql`);
const router = express.Router();
const vhost = require('vhost')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
const PORT = process.env.npm_package_config_port || 4000;
const API_PORT = 3001;
const apiRouter = require(`${__base}/routes/router`);
const isProd = 'ENVIRONMENT' in process.env && process.env.ENVIRONMENT === 'prod';


app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../', 'client', 'build', 'index.html'));
});

let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
if(isProd) {
	corsOptions.origin = 'https://www.shulkpay.com'
}
app.set('trust proxy', true);
app.use(cookieParser())

app.use(cors(corsOptions));
app.use(session());
if(isProd){
  app.enable('view cache')
  app.use(vhost('www.shulkpay.com', apiRouter))
}
else {
  app.disable("view cache");
  app.locals.host = "http://shulkpay.test:8080/";
  app.use(apiRouter);
}





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
