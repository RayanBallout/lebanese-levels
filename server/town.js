const router = require("express").Router()
let Town = require("../../models/town.schema")

router.route("/").get((req, res) => {
	Town.find()
		.then((towns) => res.json(towns))
		.catch((err) => res.status(400).json("Error: " + err))
})

router.route("/nameLike/:name").get((req, res) => {
	Town.find({
		name: { $regex: ".*" + req.params.name + "*." },
	}).then((towns) => {
		res.json(towns)
	})
})

router.route("/add").post((req, res) => {
	const name = req.body.name
	const arabic_name = req.body.arabic_name
	const area = req.body.area
	const altitude = req.body.altitude
	const caza_id = req.body.caza_id
	const governorate_id = req.body.governorate_id

	const newTown = new Town({
		name,
		arabic_name,
		area,
		altitude,
		caza_id,
		governorate_id,
	})

	newTown
		.save()
		.then(() => res.json("Town added"))
		.catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
