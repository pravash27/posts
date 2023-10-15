import React, { useState } from 'react'
import axios from 'axios'
function Post({updatePosts}) {
  const [title,setTitle] = useState('')
  const changeTitle = (e) => {
      setTitle(e.target.value)
  } 
  const handleSubmit = async () => {
    const postData = {title: title}
    const response = await axios.post("http://posts.com/posts/create",postData,{headers: {"Content-Type": "application/json"}})
    console.log(response.data)
    updatePosts(response.data)
    setTitle("")
  }
  return (
    <div>
        <h1>Create Post</h1>
      <form>
          <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={changeTitle} className="form-control"/>
          </div>
          <div className="form-group">
              <button type='button' onClick={handleSubmit} className="btn btn-primary">Submit</button>
          </div>
      </form>
    </div>
  );
}

export default Post;