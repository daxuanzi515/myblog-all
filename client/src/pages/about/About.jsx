import React, { useState } from 'react'
import Email from '../../components/email/Email';
import "./about.css"
export default function About() {

    const [Img,setImg] = useState(false);
    const [email,setEmail] = useState(false);
    const jumptoOne = ()=>{
        const w=window.open('about:blank');
        w.location.href="https://youtube.iiilab.com/"
    }
    const jumptoTwo = ()=>{
        const w=window.open('about:blank');
        w.location.href="https://convertio.co/zh/"
    }
    const jumptoThree = ()=>{
        const w=window.open('about:blank');
        w.location.href="https://www.iconfont.cn/"
    }
    const jumptoFour = ()=>{
        const w=window.open('about:blank');
        w.location.href="https://qwerty.kaiyi.cool/"
    }
    const jumptoFive = ()=>{
        const w=window.open('about:blank');
        w.location.href="https://www.sioe.cn/yingyong/yanse-rgb-16/"
    }
    return (
    <>
    <div className='mainbox'>
        <div className="webList">
        <img
        className='mainImg'
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pooban.com%2Fimages%2F201511%2Fgoods_img%2F2058_G_1446853909367.png&refer=http%3A%2F%2Fwww.pooban.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673694762&t=d8d9f3dbc898bdb9880ac599cc045874"
        alt=""
        />
        <div className='webTitle' onClick={()=>setImg(true)}>Useful Links</div>
        {
        Img===true ?( 
            <div>
            <li className="websites" onClick={jumptoOne}>格式转化网址</li>
            <li className="websites" onClick={jumptoTwo}>视频下载网址</li>
            <li className="websites" onClick={jumptoThree}>图标下载网址</li>
            <li className="websites" onClick={jumptoFour}>英语单词默写网址</li>
            <li className="websites" onClick={jumptoFive}>RGB颜色查询网址</li>
            </div>
        ):(<></>)}
        </div>
    </div>
    <div className='rightbox'>
        <img 
        className='mainImg'
        src="https://img0.baidu.com/it/u=4240607572,3341097043&fm=253&fmt=auto&app=138&f=JPEG?w=610&h=475" 
        alt="" />
        <div className="rightTitle" onClick={()=>setEmail(true)}>Contact Me</div>
        {
        email===true ?(
        <>
        <Email></Email>
        </>
         ):(<></>)}
    </div>
    </>
  )
}
