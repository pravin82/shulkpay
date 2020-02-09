const router = require("express").Router();
const lodash = require("lodash");
const studentFactory = require("./index.js");

router.post("/add", async (req, res) => {
	const params = lodash.pick(req.body, ["name", "rollNo", "studentClass", "studentSection"]);
	const addResp = await studentFactory.addStudent(req, res, params);
	res.send(addResp);
});

router.get("/studentSearch", async (req, res) => {
	const params = lodash.pick(req.body, ["studentClass", "searchPhrase"]);
	const searchResp = await studentFactory.searchStudent(req, res, params);
	res.send(searchResp);
});

module.exports = router;



