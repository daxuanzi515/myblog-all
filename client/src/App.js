import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import TopBar from "./components/topbar/TopBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home"
import Setting from "./pages/setting/Setting";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";
import Play from "./pages/play/Play";
import About from "./pages/about/About";
import Birds from './pages/play/birds/Birds';


function App() {
  const {user} = useContext(Context);
  return (
    <>
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register/*" element={user ? <Home/> : <Register/>} />
        <Route path="setting/*" element={user ? <Setting/> : <Register/>}/>
        <Route path="write/*" element={user ? <Write/> : <Register/>} />
        <Route path="login/*" element={user ? <Home/> : <Login/>} />
        <Route path="/post/:postId" element={<Single/>} />
        <Route path="/play/" element={<Play />}></Route>
        <Route path="about/*" element={<About />}></Route>
        <Route path="/ball/" element={<Birds />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
