const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express();
app.use(bodyParser.json())
app.use(cors())
const events = []
app.get("/event",(req,res) => {
    res.send(events)
})
app.post("/event",(req, res) => {
    const event = req.body;
    events.push(event)
    axios.post("http://posts-clusterip:4000/event",event)
    axios.post("http://comments-clusterip:4001/event",event)
    axios.post("http://query-clusterip:4003/event",event)
    axios.post("http://moderation-clusterip:4004/event",event)
    res.send({})
})

app.listen(4002,() => {
    console.log("Event Bus Server Started at 4002!!!!")
})