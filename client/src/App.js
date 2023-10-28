import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css';
import Post from './components/Post';
import PostList from './components/PostList';

function App() {
  console.log("Started...")
  const [posts, setPosts] = useState({})
  const fetchPosts = async () => {
    const posts = await axios.get("http://posts.com/posts")
    console.log(posts.data)
    setPosts(posts.data)
  }
  const updatePosts = (post) => {
    let newPosts = posts
    newPosts[post.id] = post
    console.log(newPosts)
    setPosts(newPosts)
    fetchPosts();
  }
  useEffect(() => {
    fetchPosts()
  },[])
  return (
    <div className="container">
        <Post updatePosts={updatePosts}/>
        <hr />
        <PostList posts={posts} />
    </div>
  );
}

export default App;
