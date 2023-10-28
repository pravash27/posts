const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express();
app.use(bodyParser.json())

app.post("/event",async (req, res) => {
    console.log(" Event Recieved: "+ req.body.type);
    const {type, data} = req.body;
    if(type === "CommentCreated"){
        const {postId,comment} = data;
        comment.status = comment.content.includes("red")? "rejected": "approved";
        await axios.post("http://event-bus-clusterip:4002/event",{ type: "CommentModerated", data: {postId: postId, comment: comment}})
    }
    res.send({})
})

app.listen(4004,() => {
    console.log("Moderation Server Started at 4004!!")
})