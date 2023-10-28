const express = require("express")
const axios = require("axios")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json())
app.use(cors())
const posts = {};
const handleEvent = (type, data) => {
    if(type === "PostCreated"){
        posts[data.id] = {...data,"comments": []}
    }else if( type === "CommentCreated"){
        posts[data.postId].comments.push(data.comment)
    }else if(type === "CommentUpdated"){
        const { postId, comment} = data
        let commentData = posts[postId].comments.find(c => c.id === comment.id)
        commentData.status = comment.status
        console.log(commentData)
    }
}
app.get("/posts",(req, res) => {
    res.send(posts)
})

app.post("/event",(req,res) => {
    console.log(" Event Recieved: "+ req.body.type);
    console.log(req.body)
    const {type, data} = req.body
    handleEvent(type, data);
    res.send({})
})

app.listen(4003,() => {
    // axios.get("http://event-bus-clusterip:4002/event").then(res => {
    //     for(let event of res.data){
    //         console.log("Handling event: "+ event.type)
    //         handleEvent(event.type,event.data)
    //     }
    // })
    console.log("Query Server Started at 4003!!")
})