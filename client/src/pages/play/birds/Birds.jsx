import React from 'react'
import "./birds.css"
import Ball from "./element/ball"
import Pillar from "./element/pillar"

class Birds extends React.Component {
    constructor() {
        super()
        this.pillars = []
        this.pause = false
        this.score = 0
        this.t = 0.01;
      }
      componentDidMount () {
        this.canvas = document.getElementById('cas')
        this.ctx = this.canvas.getContext("2d")
        this.ctx.font = 'normal 24px Arial';
        this.ctx.strokeStyle = '#FFB6C1'
        this.ball = new Ball(40, "#6A5ACD", this.canvas)
        this.ball.paintTo(this.canvas)
        this.initPillar()
        this.reset()
        this.animate()
        document.onkeydown = (e) => {
          if (e.code === 'Space') {
            if (this.pause) {
              this.pause = false
              this.pillars[0].reset()
            }
            this.toggleBirdVy(true)
          }
        }
        document.onkeyup = (e) => {
          if (e.code === 'Space') {
            this.toggleBirdVy(false)
          }
        }
        this.pause = true
      }
      initPillar () {
        let pillar
        let nextPillar
        for (let i = 0; i <= 10; i++) {
          pillar = nextPillar ? nextPillar : new Pillar(this.canvas)
          if (i === 10) {
            pillar.setNext(this.pillars[0])
          } else {
            nextPillar = new Pillar(this.canvas)
            pillar.setNext(nextPillar)
          }
          this.pillars.push(pillar)
        }
      }
      animate () {
        if (!this.pause) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.ctx.save();
          this.ctx.fillStyle = "rgba(255,255,255,0.2)";
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
          this.ctx.restore();
          this.ball.run(this.t)
          this.pillars.forEach(pillar => {
            pillar.move(this.t)
            if (this.crash(pillar, this.ball)) {
              this.pause = true
            }
          })
          this.score = this.score + 0.01
          this.ctx.strokeText(`Your Score: ${this.score.toFixed(2)}`, 20, 40)
        }
        window.requestAnimationFrame(this.animate.bind(this));
      }
      crash (pillar, ball) {
        if ((ball.x + ball.radius) > pillar.x && ball.x < (pillar.x + pillar.width) && ((ball.y < pillar.height && pillar.up) || ((ball.y + ball.radius) > (this.canvas.height - pillar.height) && !pillar.up))) {
          alert('crash')
          this.reset()
        }
        if (ball.y <= ball.radius || ball.y >= (this.canvas.height - ball.radius)) {
          alert('crash')
          this.reset()
        }
      }
      reset () {
        this.ball.x = 200
        this.ball.y = 400
        this.pillars.forEach(pillar => {
          pillar.reset(true)
        })
        this.score = 0
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ball.run(this.t)
        this.ctx.strokeText(`SpaceControl`, this.canvas.width - 160,40)
        this.pause = true
      }
      toggleBirdVy (status) {
        this.ball.toggleGrv(status);
      }
      render () 
      {
        return(
        <>
        <div className="test">
        <canvas id="cas" width="1000" height="800" style={{ 'backgroundColor': '#9370DB'}}></canvas>
        </div>
        </>
         )}
}
export default Birds;