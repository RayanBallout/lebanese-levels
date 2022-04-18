const PORT = process.env.PORT || 5000
const express = require("express")
const axios = require("axios")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

require("dotenv").config()

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true })

const connection = mongoose.connection
connection.once("open", () => {
	console.log("Database connection established")
})

const governorateRouter = require("./routes/governorate")
const cazaRouter = require("./routes/caza")
const townRouter = require("./routes/town")

app.use("/governorate", governorateRouter)
app.use("/caza", cazaRouter)
app.use("/town", townRouter)

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`))
