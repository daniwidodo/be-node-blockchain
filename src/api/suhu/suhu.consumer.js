require("dotenv").config() // load .env variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const amqplib = require("amqplib");
const Suhu = require("../../models/Suhu"); // import user model
const {suhuQueue} = require("../suhu/suhu.controller")
//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {
    PORT, 
    RABBITMQ_URL,
} = process.env
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

// APP LISTENER
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))

const createSuhu = async  () => {
    try {
        let connection = await amqplib.connect(RABBITMQ_URL);
        let channel = await connection.createChannel();
        await channel.assertQueue(suhuQueue);
        channel.consume(suhuQueue, async (message) => {
            consumedData = await JSON.parse(message.content.toString());
            await Suhu.create(consumedData).
                catch((error) => res.status(400).json({ error }))
            console.log('data from suhuQueue ==>', consumedData)
            channel.ack(message)
        });
      } catch (error) {
        console.log(error);
      }
}
createSuhu();