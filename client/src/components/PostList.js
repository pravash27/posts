import React from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList({posts}){
    console.log(posts)
    const postLayout = Object.values(posts).map(p => {
        return (
            <div style={{width:"30%", marginBottom: "20px"}} className="card" key={p.id}>
                <div className="card-body">
                    <h3>{p.title}</h3>
                    <CommentList comments={p.comments} />
                    <CommentCreate postId={p.id} />
                </div>
            </div>
        )
    })
    return (
        <div className="d-flex flex-row flex-wrap justfy-content-between">
            {postLayout}
        </div>
    )
}

export default PostList