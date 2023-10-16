const express = require("express")
const axios = require("axios")
const cors = require("cors")
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto")
const app = express();
app.use(bodyParser.json())
app.use(cors())
const posts = {}
app.get("/posts",(req,res) => {
    res.send(posts);
})

app.post("/posts/create", async (req,res) => {
    const id = randomBytes(4).toString('hex')
    const {title} = req.body;
    const post = {
        "id": id,
        title: title
    }
    posts[id] = post
    await axios.post("http://event-bus-clusterip:4002/event",{ type: "PostCreated", data: post})
    res.status(201).send(post)
})

app.post("/event",(req,res) => {
    console.log("Event Recieved: "+ req.body.type)
    res.send({})
})

app.listen(4000,() => {
    console.log("v3")
    console.log("Posts Server Started at 4000!!!!")
})