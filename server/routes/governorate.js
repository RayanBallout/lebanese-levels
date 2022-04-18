const router = require("express").Router()
let Governorate = require("../models/governorate.schema")

router.route("/").get((req, res) => {
	Governorate.find()
		.then((governorates) => res.json(governorates))
		.catch((err) => res.status(400).json("Error: " + err))
})

router.route("/nameLike/:name").get((req, res) => {
	Governorate.find({
		name: { $regex: ".*" + req.params.name + "*." },
	}).then((governorates) => {
		res.json(governorates)
	})
})

router.route("/add").post((req, res) => {
	const name = req.body.name
	const arabic_name = req.body.arabic_name
	const num_of_cazas = req.body.num_of_cazas
	const area = req.body.area

	const newGovernorate = new Governorate({
		name,
		arabic_name,
		num_of_cazas,
		area,
	})

	newGovernorate
		.save()
		.then(() => res.json("Governorate added"))
		.catch((err) => res.status(400).json("Error: " + err))
})

router.route("/:id").get((req, res) => {
	Governorate.findById(req.params.id)
		.then((governorate) => res.json(governorate))
		.catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
