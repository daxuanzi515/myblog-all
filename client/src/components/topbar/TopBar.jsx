import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function TopBar() {
  const imgp = "http://localhost:5000/images/"
  const {user, dispatch} = useContext(Context);
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"});
  }
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa fa-weixin fa-2x" aria-hidden="true"></i>
        <i className="topIcon fa fa-lightbulb-o fa-2x" aria-hidden="true"></i>
        <i className="topIcon fa fa-paper-plane fa-2x" aria-hidden="true"></i>
        <i className="topIcon fa fa-gamepad fa-2x" aria-hidden="true"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">HOME</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/about">ABOUT</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/play">GAMES</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/write">WRITE</Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
               {user && "LOGOUT"}
            </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ?(
            <Link to="/setting">
              <img 
              className="topImg"
              src = {imgp+user.profilePic}
              alt = ""/>
            </Link>
            ): (
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/login">LOGIN</Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/register">REGISTER</Link>
                </li>
              </ul>
              )
        }

        <i className="searchIcon fa fa-check-square" aria-hidden="true"></i> 
      </div>
    </div>
  )
}
