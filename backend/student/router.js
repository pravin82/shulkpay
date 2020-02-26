const router = require("express").Router();
const lodash = require("lodash");
const studentFactory = require("./index.js");

router.post("/add", async (req, res) => {
	const params = lodash.pick(req.body, ["name", "rollNo", "studentClass", "studentSection"]);
	const addResp = await studentFactory.addStudent(req, res, params);
	res.send(addResp);
});

router.get("/studentSearch", async (req, res) => {
	console.log("InsidestudentSearch++")
	const params = lodash.pick(req.query, ["studentClass", "searchPhrase"]);
	const searchResp = await studentFactory.searchStudent(req, res, params);
	res.send(searchResp);
});

router.get("/transDetail", async (req, res) => {
	const params = lodash.pick(req.query, ["studentId"]);
	const detailResp = await studentFactory.getTransDetail(req, res, params);
	res.send(detailResp);
});

router.get("/studentDetail", async (req, res) => {
	const params = lodash.pick(req.query, ["studentId"]);
	const detailResp = await studentFactory.getStudentDetail(req, res, params);
	res.send(detailResp);
});

module.exports = router;



