import React, { Component } from 'react';
import './app.less';

let currentPosition = 0
let currentPoint = -1
let pageNow = 1

class App extends Component {
  state = {
    eleArr : [3, 4, 1, 2, 3],
    currentIndex : 2
  }

  componentDidMount = () => {
    this.bindTouchEvent()
  }

  transform = translate => {
    console.log(translate);
    
    setTimeout(() => {
      this.refs.viewport.style.webkitTransform = `translate3d(${translate}px,0,0)`
    }, 0);
    currentPosition = translate
  }

  setPageNow = (currentPoint) => {
  

    if (currentPoint != -1) {
      points[currentPoint].className = ''
    }
    points[currentPoint].className = 'now'
  }

  bindTouchEvent = () => {

    let isMove = false
    let points = document.querySelectorAll('.pageview')
    console.log(points[0].clientWidth);
    
    const viewport = this.refs.viewport
    viewport.style.width = points[0].clientWidth*(this.state.eleArr.length+10)+ 'px'
    this.transform(-265)
    const pageWidth = window.innerWidth
    const moveWidth = 300

    const maxWidth = - pageWidth * (points.length - 1)
    let startX,
      startY
    let initialPos = 0
    let moveLength = 0
    let direction = 'left'
    let startT = 0
    let isTouchEnd = true
    viewport.addEventListener('touchstart', e => {
      e.preventDefault()
      
      console.log(Math.abs(moveLength));
      
      // if(Math.abs(moveLength) >= 150) {
      //   const eleArr = this.state.eleArr
      //   const last = eleArr.pop() 
      //   console.log(last);
      //   eleArr.unshift(last)
      //   console.log(eleArr);
      //   this.setState({eleArr})
        
      // }
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        startX = touch.pageX
        startY = touch.pageY
        
        initialPos = currentPosition

        viewport.style.webkitTransition = ''
        startT = + new Date()
        isMove = false
        // isTouchEnd = false
      }
    }, false)


    viewport.addEventListener('touchmove', e => {
      e.preventDefault()
      // if (isTouchEnd) return
      const touch = e.touches[0]

      let deltaX = touch.pageX - startX
      let deltaY = touch.pageY - startY
      
      let translate = initialPos + deltaX
      
      if (translate > 0) {
        translate = 0
      }
      if (translate < maxWidth) {
        translate = maxWidth
      }
      deltaX = translate - initialPos

      this.transform(translate)
      isMove = true
      moveLength = deltaX
      direction = deltaX > 0 ? 'right': 'left'
  
    }, false)


    viewport.addEventListener('touchend', e => {
      e.preventDefault()
      let translate = 0
      const deltaT = + new Date() - startT
      viewport.style.webkitTransition = '0.3s ease -webkit-transform'
      const count = Math.abs(currentPosition) / pageWidth

      if (deltaT < 300) {
        if (currentPosition === 0 && translate === 0) {
          return ;
      }
      translate = direction === 'left' ? 
          currentPosition - (moveWidth + moveLength) 
          : currentPosition + moveWidth - moveLength;
      // 如果最终位置超过边界位置，则停留在边界位置
      // 左边界
      translate = translate > 0 ? 0 : translate; 
      // 右边界
      translate = translate < maxWidth ? maxWidth : translate; 
      } else {
        
        if (Math.abs(moveLength) / moveWidth < 0.5) {
          translate = currentPosition - moveLength
        } else {
          translate = direction === 'left' ? 
          currentPosition - (moveWidth + moveLength)
          : currentPosition + moveWidth - moveLength
          
          translate = translate > 0 ? 0 : translate
          translate = translate < maxWidth ? maxWidth : translate
        }
      }

      this.transform(translate)
      const currentIndex = Math.round(Math.abs(translate) / 300) + 1
      this.setState({
        currentIndex
      })      
    })
  }


  render() {
    return (
      <div className="page">
        <div className="viewport" ref="viewport">
          {
            this.state.eleArr.map((v,i) => 
            <div key= {i} className="pageview" style={{ background: "#3b76c0",width: '300px' }} >
              <h3 >页面-{v}</h3>
              <button style={{ display: "none" }}></button>
            </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
