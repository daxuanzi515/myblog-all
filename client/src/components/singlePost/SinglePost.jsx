import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";


export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const imgp = "http://localhost:5000/images/";
  const {user} =useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(()=>{
    const getPost = async () =>{
        const result = await axios.get("/posts/" + path);
        setPost(result.data)
        setTitle(result.data.title)
        setDesc(result.data.desc)
    };
    getPost();
  },[path])
  const handleDelete = async() =>{
    try{
      await axios.delete(`/posts/${post._id}`,{data:{username:user.username}});
      window.location.replace("/");
    }catch(err){    }
  };
  const handleUpdate = async() =>{
    try{
      await axios.put(`/posts/${post._id}`,{
        username:user.username,
        title,
        desc
      });
      setUpdateMode(false)
    }catch(err){    }
  };

  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {post.photo && ( <img 
            src={imgp+post.photo}
            alt="" 
            className="singlePostImg" 
            />)}
           {updateMode ?(
            <input 
            type="text"
            value={title}
            className = "singlePostTitleInput"
            autoFocus
            onChange={(e)=>setTitle(e.target.value)}
            />
           ):(
            <h1 className="singlePostTitle">
                {post.title}
                {post.username === user?.username&&(
                <div className="singlePostEdit">
                  <i className="singlePostIcon fa fa-pencil" aria-hidden="true" onClick={()=> setUpdateMode(true)}></i>
                  <i className="singlePostIcon fa fa-trash" aria-hidden="true" onClick={handleDelete}></i>
                  <i className="singlePostIcon fa fa-star" aria-hidden="true"></i>
                </div>
                )}
            </h1>
           )}

            <div className="singlePostInfo">
                <span className="singlePostAuthor">Autor:
                <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
                </Link>
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
            <textarea className="singlePostDescInput" value={desc}
            onChange={(e)=> setDesc(e.target.value)}/>
            ):
            (            
            <p className="singlePostDesc">
                {desc}
            </p>
            )}
          {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        </div>
    </div>
  )
}
