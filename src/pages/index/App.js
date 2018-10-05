import React, { Component } from 'react';
import './app.less';

class App extends Component {
  componentDidMount = () => {
    this.bindTouchEvent()
  }

  transform = translate => {
    this.refs.viewport.style.webkitTransform = `translate3d(${translate}px,0,0)`
    this.setState({
      currentPosition: translate
    })
  }

  setPageNow = (currentPoint) => {
    const {
      points
    } = this.state

    // if (currentPoint != -1) {
    //   points[currentPoint].className = ''
    // }
    // points[currentPoint].className = 'now'
  }

  bindTouchEvent = () => {
    let currentPosition = 0
    let currentPoint = -1
    let pageNow = 1
    let isMove = false
    let points = document.querySelectorAll('.pageview')
    const viewport = this.refs.viewport
    const pageWidth = window.innerWidth

    const maxWidth = - pageWidth * (points.length - 1)
    let startX,
      startY
    let initialPos = 0
    let moveLength = 0
    let startT = 0
    let isTouchEnd = true
    viewport.addEventListener('touchstart', e => {
      e.preventDefault()
      if (e.touches.length === 1 || isTouchEnd) {
        const touch = e.touches[0]
        startX = touch.pageX
        startY = touch.pageY
        initialPos = currentPosition

        viewport.style.webkitTransition = ''
        startT = + new Date()
        isMove = false
        isTouchEnd = false
      }
    }, false)


    viewport.addEventListener('touchmove', e => {
      e.preventDefault()
      if (isTouchEnd) return
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
    }, false)


    viewport.addEventListener('touchend', e => {
      e.preventDefault()
      let translate = 0
      const deltaT = + new Date() - startT
      viewport.style.webkitTransition = '0.3s ease -webkit-transform'
      const count = Math.abs(currentPosition) / pageWidth

      if (deltaT < 300 && isMove) {
        translate = - pageWidth + currentPosition + moveLength
      } else {
        if (Math.abs(moveLength) / pageWidth < 0.5) {
          translate = currentPosition - moveLength
        } else {

          translate = translate > 0 ? 0 : translate
          translate = translate < maxWidth ? maxWidth : translate
        }
      }
      console.log(translate);

      this.transform(translate)
      setTimeout(() => {
        console.log(currentPosition);
      }, 0);
      const pageNow = Math.round(Math.abs(translate) / pageWidth) + 1
      setTimeout(() => {

        this.setPageNow(pageNow - 1)
      }, 100);

    })
  }


  render() {
    return (
      <div className="page">
        <div className="viewport" ref="viewport">
          <div className="pageview" style={{ background: "#3b76c0" }} >
            <h3 >页面-1</h3>s
            <button style={{ display: "none" }}></button>
          </div>
          <div className="pageview" style={{ background: "#58c03b" }}>
            <h3>页面-2</h3>
          </div>
          <div className="pageview" style={{ background: "#c03b25" }}>
            <h3>页面-3</h3>
          </div>
          <div className="pageview" style={{ background: "#e0a718" }}>
            <h3>页面-4</h3>
          </div>
          <div className="pageview" style={{ background: "#c03eac" }}>
            <h3>页面-5</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
