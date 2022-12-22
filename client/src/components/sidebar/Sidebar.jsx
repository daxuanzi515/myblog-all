import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"


export default function Sidebar() {
    const [cats,setCats] = useState([]);
    useEffect(()=>{
        const getCats = async () =>{
            const result = await axios.get("/categories");
            setCats(result.data)
        };
        getCats();
      },[])
    const [Img,setImg] = useState(false);

    return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img 
            src="https://s2.loli.net/2022/12/14/oGwQm3J2rvlKzHU.png"
            alt=""
            />
            <p>Chen Xuanxin</p>
            <p className="text">React/C++/Python/Java, ACG, self-development, programming, fight in coding...</p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
               {cats.map((c)=>(
                <Link to={`/?cat={c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
                </Link>
               ))}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW ME</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa fa-weixin" aria-hidden="true" onClick={()=>setImg(true)}></i>
                <i className="sidebarIcon fa fa-lightbulb-o fa-2x" aria-hidden="true"></i>
                <i className="sidebarIcon fa fa-paper-plane fa-2x" aria-hidden="true"></i>
                <i className="sidebarIcon fa fa-gamepad fa-2x" aria-hidden="true"></i>
            </div>            
        </div>
        {
        Img===true ?( 
         <div>
            <img 
            className="wechat"
            src="https://i.postimg.cc/zfZvF984/7cd78a9bf547b9de078a9532c5871b9.png"
            alt=""                />
            </div>):(<></>)}
    </div>
  )
}
