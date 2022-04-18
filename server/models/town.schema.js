const mongoose = require("mongoose")

const Schema = mongoose.Schema

const townSchema = new Schema({
	name: { type: String, required: true },
	arabic_name: { type: String, required: true },
	area: { type: String, required: true },
	altitude: { type: String, required: true },
	caza_id: { type: String, reuqired: false },
	governorate_id: { type: String, required: true },
})

const Town = mongoose.model("Town", townSchema)

module.exports = Town
