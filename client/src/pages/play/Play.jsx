import React, { useEffect, useState } from 'react'
import "./play.css"
import ScoreBoard from './ScoreBoard'
import redSnack from "./pics/red.png"
import orangeSnack from "./pics/orange.png"
import yellowSnack from "./pics/yellow.png"
import greenSnack from "./pics/green.png"
import blueSnack from "./pics/blue.png"
import purpleSnack from "./pics/purple.png"
import blank from "./pics/blank.png"
import { Link } from "react-router-dom";
const width = 8
const candyColors = [
    redSnack,
    orangeSnack,
    yellowSnack,
    greenSnack,
    blueSnack,
    purpleSnack
]
//fuctions up-down right-left
export default function Play() {

    //random colors generate
    const [currentColorArrangment,setCurrentColorArrangment] = useState([]);
    const [squareBeinDragged,setSquareBeinDragged] = useState(null);
    const [squareBeinReplaced,setSquareBeinReplaced] = useState(null);
    //计算分数
    const [scoreDisplay,setScoreDisplay] = useState(0)
    //列4个置空
    const checkForColumnOfFour = () =>{
        for(let i=0;i<=39;i++)
        {
            const columnOfFour = [i, i+width,i+width*2,i+width*3]
            const decidedColor = currentColorArrangment[i]
            const isBlank = currentColorArrangment[i] === blank
            if(columnOfFour.every(square => currentColorArrangment[square] === decidedColor && !isBlank))
            {
                setScoreDisplay((score)=> score + 10)
                columnOfFour.forEach(square => currentColorArrangment[square] = blank)
                return true
            }
        }
    }
    //行4个置空
    const checkForRowOfFour = () =>{
        for(let i=0;i<64;i++)
        {
            const RowOfFour = [i, i+1,i+2,i+3]
            const decidedColor = currentColorArrangment[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorArrangment[i] === blank
            if(notValid.includes(i)) continue

            if(RowOfFour.every(square => currentColorArrangment[square] === decidedColor && !isBlank))
            {
                setScoreDisplay((score)=> score + 10)
                RowOfFour.forEach(square => currentColorArrangment[square] =blank)
                return true
            }
        }
    }
    //列3个一致就置空
    const checkForColumnOfThree = () =>{
        for(let i=0;i<=47;i++)
        {
            const columnOfThree = [i, i+width,i+width*2]
            const decidedColor = currentColorArrangment[i]
            const isBlank = currentColorArrangment[i] === blank
            if(columnOfThree.every(square => currentColorArrangment[square] === decidedColor && !isBlank))
            {
                setScoreDisplay((score)=> score + 5)
                columnOfThree.forEach(square => currentColorArrangment[square] =blank)
                return true
            }
        }
    }

    //行3个一致就置空
    const checkForRowOfThree = () =>{
        for(let i=0;i<64;i++)
        {
            const RowOfThree = [i, i+1,i+2]
            const decidedColor = currentColorArrangment[i]
            //限制界限 避免超出
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            const isBlank = currentColorArrangment[i] === blank

            if(notValid.includes(i)) continue
            if(RowOfThree.every(square => currentColorArrangment[square] === decidedColor && !isBlank))
            {
                setScoreDisplay((score)=> score + 5)
                RowOfThree.forEach(square => currentColorArrangment[square] =blank)
                return true
            }
        }
    }

    const moveIntoSquareBelow = () =>{
        for(let i=0;i<=55;i++)
        {
            //替代消除区域
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            //生成新随机块
            if (isFirstRow && currentColorArrangment[i] === blank)
            {
                let randomBlock =  Math.floor(Math.random()*candyColors.length)
                currentColorArrangment[i] = candyColors[randomBlock]
            }

            if (currentColorArrangment[i+width] === blank)
            {
                currentColorArrangment[i+width] = currentColorArrangment[i]
                currentColorArrangment[i] = blank
            }
        }
    }
    const dragStart = (e) =>{
        console.log("Start Drag")
        setSquareBeinDragged(e.target)
    }
    const dragDrop = (e) =>{
        console.log("End Drag")
        setSquareBeinReplaced(e.target)
    }
    const dragEnd = (e) =>{
        console.log("Drop Drag")
        const squareBeinDraggedId = parseInt(squareBeinDragged.getAttribute('data-id'))
        const squareBeinReplacedId = parseInt(squareBeinReplaced.getAttribute('data-id'))
        currentColorArrangment[squareBeinReplacedId] = squareBeinDragged.getAttribute('src')
        currentColorArrangment[squareBeinDraggedId] = squareBeinReplaced.getAttribute('src')
        
        console.log("squareBeinDraggedId",squareBeinDraggedId)
        console.log("squareBeinReplacedId",squareBeinReplacedId)
        //限制移动范围 只能在上下左右
        const limit = 
        [
            squareBeinDraggedId-1,
            squareBeinDraggedId-width,
            squareBeinDraggedId+1,
            squareBeinDraggedId+width,
        ]
        const validMove = limit.includes(squareBeinReplacedId)

        //限制棋盘
        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()
        if(squareBeinReplacedId && validMove &&
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree))
            {
                setSquareBeinDragged(null)
                setSquareBeinReplaced(null)
            }
            else
            {
                currentColorArrangment[squareBeinReplacedId] = squareBeinReplaced.getAttribute('src')
                currentColorArrangment[squareBeinDraggedId] = squareBeinDragged.getAttribute('src')
                setCurrentColorArrangment([...currentColorArrangment])
            }
    }

    const createBoard = ()=>{
        const randomColorArrangment = []
        for(let i=0;i<width*width;i++)
        {
            const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)];
            randomColorArrangment.push(randomColor)
        }
        setCurrentColorArrangment(randomColorArrangment)
    }
    useEffect(()=>{
        createBoard()
    },[])
    useEffect(()=>{
        //0.1s验证一次
        const timer =setInterval(()=>
        {
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArrangment([...currentColorArrangment])
        },100)
        return ()=>clearInterval(timer)
    },[checkForColumnOfFour,checkForRowOfFour,checkForColumnOfThree,checkForRowOfThree,moveIntoSquareBelow,currentColorArrangment])

  return (
    <>
    <div className="board">
        <div className="game">
            {currentColorArrangment.map((candyColor, index) => (
                <img
                key={index}
                src={candyColor}
                alt={candyColor}
                data-id={index}
                draggable={true}
                onDragStart = {dragStart}
                onDragOver = {(e)=> e.preventDefault()}
                onDragEnter = {(e)=> e.preventDefault()}
                onDragLeave = {(e)=> e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
                />
            ))}
        </div>
        <div className="score-board">       
            Your Score:
            <ScoreBoard score={scoreDisplay}/>
        </div>
        <Link to="/ball" className="link">
            <div>
                <img 
                className='img'
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F28%2F12%2F5b7b62d8c7a1c_610.jpg&refer=http%3A%2F%2Fbpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673809488&t=adfaba7c4644fc7477fb308d61ceee2c" 
                alt="" />
            </div>
        </Link>
    </div>
    </>
  )
}
