import React, { useState, useEffect } from "react";

const CommentList = ({ comments }) => {
  console.log(comments)
  const renderedComments = comments.map((comment) => {
    let content = ""
    if(comment.status==="approved"){
      content = comment.content
    }
    if(comment.status==="pending"){
      content = "Comment is waiting for moderation."
    }
    if(comment.status==="rejected"){
      content = "Comment is rejected."
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
