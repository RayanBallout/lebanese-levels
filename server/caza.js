const router = require("express").Router()
let Caza = require("../models/caza.schema")

router.route("/").get((req, res) => {
	Caza.find()
		.then((cazas) => res.json(cazas))
		.catch((err) => res.status(400).json("Error: " + err))
})

router.route("/nameLike/:name").get((req, res) => {
	Caza.find({
		name: { $regex: ".*" + req.params.name + "*." },
	}).then((cazas) => {
		res.json(cazas)
	})
})

router.route("/add").post((req, res) => {
	const name = req.body.name
	const arabic_name = req.body.arabic_name
	const num_of_towns = req.body.num_of_towns
	const area = req.body.area
	const governorate_id = req.body.governorate_id

	const newCaza = new Caza({
		name,
		arabic_name,
		num_of_towns,
		area,
		governorate_id,
	})

	newCaza
		.save()
		.then(() => res.json("Caza added"))
		.catch((err) => res.status(400).json("Error: " + err))
})

router.route("/inGovernate/:id").get((req, res) => {
	Caza.find({ governorate_id: req.params.id })
		.then((cazas) => res.json(cazas))
		.catch((err) => {
			res.status(400).json("Error: " + err)
		})
})

module.exports = router
