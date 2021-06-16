'use strict'
document.addEventListener("DOMContentLoaded", ()=>{
    const startBtn=document.querySelector("#start"),
    screens=document.querySelectorAll(".screen"),
    timesBtn=document.querySelector("#time-list"),
    timeEl=document.querySelector("#time"),
    board=document.querySelector("#board")
    let time=0,
    score=0,
    timer
    board.addEventListener("click", (e)=>{
        if(e.target.classList.contains("circle")){
            score++
            e.target.remove()
            createRandomCircle()
        }else if(e.target.classList.contains("reload")){
            screens[1].classList.remove("up")
        }
    })
    startBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        screens[0].classList.add("up")
    })
    timesBtn.addEventListener("click", e=>{
        if(e.target.classList.contains("time-btn")){
            time=parseInt(e.target.getAttribute("data-time"))
            screens[1].classList.add("up")
            startGame()
        }
    })
    function startGame(){
        board.innerHTML=``
        timeEl.parentNode.classList.remove("hide")
        timer=setInterval(decreaseTime, 1000)
        createRandomCircle()
        setTime(time)
    }
    function decreaseTime(){
        if(time===0){
            finishGame()
            clearInterval(timer)
        }else{
            let current=--time
            if(current<10){
            current=`0${current}`
            }
            setTime(current)
        }
    }
    function setTime(value){
        timeEl.innerHTML=`00:${value}`
    }
    function finishGame(){
        board.innerHTML=`
        <div class+"end>
            <h1>Cчет <span class="primary">${score}</span></h1>
            <div><i class="fas fa-sync-alt reload"></i></div>
        </div>
        `
        timeEl.parentNode.classList.add("hide")
    }
    function createRandomCircle(){
        const circle=document.createElement('div'),
        size=getRandomNumber(10, 60),
        {width, height}=board.getBoundingClientRect(),
        positionX=getRandomNumber(0, width-size),
        color=getRandonColor(),
        positionY=getRandomNumber(0, height-size)
        circle.classList.add("circle")
        circle.style.width=`${size}px`
        circle.style.height=`${size}px`
        circle.style.top=`${positionY}px`
        circle.style.left=`${positionX}px`
        circle.style.background=color
        board.append(circle)

    }
    function getRandomNumber(min, max){
        return Math.round(Math.random()*(max-min)+min)
    }
    function getRandonColor(){
        const red=Math.floor(Math.random()*255),
        green=Math.floor(Math.random()*255),
        blue=Math.floor(Math.random()*255)
        const color=`rgb(${red}, ${green}, ${blue})`
        return color
    }
})