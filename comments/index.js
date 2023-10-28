const express = require("express")
const axios = require("axios")
const cors = require("cors")
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto")
const app = express();
app.use(bodyParser.json())
app.use(cors())
const commentsByPost = {}
app.get("/posts/:id/comments",(req,res) => {
    res.send(commentsByPost[req.params.id] || []);
})

app.post("/posts/:id/comments",async (req,res) => {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body;
    const comment = { id: id, content: content, status: "pending"}
    const comments = commentsByPost[req.params.id] || []
    comments.push(comment)
    commentsByPost[req.params.id] = comments
    await axios.post("http://event-bus-clusterip:4002/event",{ type: "CommentCreated", data: {postId: req.params.id, comment: comment}})
    res.status(201).send(comment)
})

app.post("/event",async (req,res) => {
    console.log("Event Recieved: "+ req.body.type)
    const { type, data} = req.body
    if(type === "CommentModerated"){
        const { postId, comment} = data
        const comments = commentsByPost[postId]
        let commentData = comments.find(c => c.id === comment.id)
        commentData = comment
        console.log(commentData)
        await axios.post("http://event-bus-clusterip:4002/event",{ type: "CommentUpdated", data: {postId:postId, comment: comment}})
    }
    res.send({})
})

app.listen(4001,() => {
    console.log("Comments Server Started at 4001!!")
})