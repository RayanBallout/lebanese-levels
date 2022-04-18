const mongoose = require("mongoose")

const Schema = mongoose.Schema

const cazaSchema = new Schema({
	name: { type: String, required: true },
	arabic_name: { type: String, required: true },
	num_of_towns: { type: Number, required: true },
	area: { type: Number, required: true },
	governorate_id: { type: String, required: true },
})

const Caza = mongoose.model("Caza", cazaSchema)

module.exports = Caza
