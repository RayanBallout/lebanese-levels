const mongoose = require("mongoose")

const Schema = mongoose.Schema

const governorateSchema = new Schema({
	name: { type: String, required: true },
	arabic_name: { type: String, required: true },
	num_of_cazas: { type: Number, required: true },
	area: { type: Number, required: true },
})

const Governorate = mongoose.model("Governorate", governorateSchema)

module.exports = Governorate
