import axios from "axios"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./write.css"

export default function Write() {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [file,setFile] = useState(null)
  const {user} = useContext(Context);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPost={
      username:user.username,
      title,
      desc
    };
    if(file)
    {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo = filename;
      try{
        await axios.post("/upload",data);
      } 
      catch(err)
      {
      }
    }
    //替换缓存里面的内容
    try{
     const res = await axios.post("/posts",newPost);
    window.location.replace("/");
    } 
    catch(err)
    { }

  }
  return (
    <div className="write">
        {file &&(<img 
        className="writeImg"
        src={URL.createObjectURL(file)} 
        alt=""
        />)}
       <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className="writeIcon fa fa-plus-square" aria-hidden="true"></i>
                </label>
                <input type="file" id="fileInput" style={{display: "none"}}
                onChange={(e)=> setFile(e.target.files[0])}/>
                <input 
                type="text" 
                placeholder="Title"
                className="writeInput"
                autoFocus={true}
                onChange={(e)=> setTitle(e.target.value)}
                />
            </div>
            <div className="writeFormGroup">
                <textarea placeholder="Tell Your Story..." type="text" className="writeInput"
                onChange={(e)=> setDesc(e.target.value)}></textarea>
            </div>
            <button className="writeSubmit" type="submit">
                Publish
            </button>
       </form>
    </div>
  )
}
