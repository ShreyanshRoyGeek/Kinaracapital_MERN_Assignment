require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// allow cross-origin
app.use(cors())


/* Routes Imports  */
const studentRouter = require("./routes/studentRouter")



/* Routes Path  */
const router = app.use("/", studentRouter)




/* MongoDB Atlas cloud connection */
const URI = process.env.MONGO_ATLAS_URI


mongoose.connect(URI, { useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB connected successfully👍")
})
.catch((error) => {
    console.log("Mngodb connection error", error)
})



let port = 8080
app.listen(port, () => {
    console.log(`Server started on port ${port} ✋`)
})

