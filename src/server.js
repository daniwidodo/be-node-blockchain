require("dotenv").config() // load .env variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const UserRouter = require("./api/auth/auth.controller") //import User Routes
const {melonRouter} = require("./api/melon/melon.controller") //import User Routes
const {suhuRouter} = require("./api/suhu/suhu.controller") //import User Routes


//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 3000} = process.env

// Create Application Object
const app = express()

// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies


// ROUTES AND ROUTES
app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})
app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/melon", melonRouter) // send all "/user" requests to UserRouter for routing
app.use("/suhu", suhuRouter) // send all "/user" requests to UserRouter for routing


// APP LISTENER
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))