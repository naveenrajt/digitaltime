// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    imageUrl: true,
    timeInSeconds: 25 * 60,
    initialTimeInSeconds: 25,
    isRunning: false,
  }

  onDecrementTime = () => {
    const {timeInSeconds} = this.state
    if (timeInSeconds > 0) {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds - 1,
      }))
    }

    if (timeInSeconds === 0) {
      clearInterval(this.TimerId)
      this.setState({
        imageUrl: true,
        isRunning: true,
      })
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      initialTimeInSeconds: prevState.initialTimeInSeconds + 1,
      timeInSeconds: (prevState.initialTimeInSeconds + 1) * 60,
    }))
  }

  onDecrement = () => {
    const {initialTimeInSeconds} = this.state
    if (initialTimeInSeconds > 1) {
      this.setState(prevState => ({
        initialTimeInSeconds: prevState.initialTimeInSeconds - 1,
        timeInSeconds: (prevState.initialTimeInSeconds - 1) * 60,
      }))
    }
  }

  displayTime = () => {
    const {timeInSeconds} = this.state
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes > 9 ? `${minutes}` : `0${minutes}`}:${
      seconds > 9 ? `${seconds}` : `0${seconds}`
    }`
  }

  onChange = () => {
    this.setState(
      prevState => ({
        imageUrl: !prevState.imageUrl,
        isRunning: !prevState.isRunning,
      }),
      () => {
        const {imageUrl, timeInSeconds} = this.state
        if (!imageUrl && timeInSeconds > 0) {
          this.TimerId = setInterval(this.onDecrementTime, 1000)
        } else {
          clearInterval(this.TimerId)
        }
      },
    )
  }

  onReset = () => {
    clearInterval(this.TimerId)
    this.setState({
      imageUrl: true,
      timeInSeconds: 25 * 60,
      initialTimeInSeconds: 25,
      isRunning: false,
    })
  }

  render() {
    const {imageUrl, initialTimeInSeconds, isRunning} = this.state
    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="play-time-container">
          <div className="time-container">
            <div className="timer">
              <h1 className="timer-1">{this.displayTime()}</h1>
              <p className="switch">{imageUrl ? 'Paused' : 'Running'}</p>
            </div>
          </div>
          <div className="button-container">
            <div className="set-container">
              <div className="play-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.onChange}
                >
                  <img
                    src={
                      imageUrl
                        ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    }
                    alt={imageUrl ? 'play icon' : 'pause icon'}
                    className="image"
                  />
                </button>
                <p className="paragraph">{imageUrl ? 'Start' : 'Pause'}</p>
              </div>
              <div className="reset-container">
                <button className="button" type="button" onClick={this.onReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="image"
                  />
                </button>
                <p className="paragraph">Reset</p>
              </div>
            </div>
            <p className="set-paragraph">Set Timer Limit</p>
            <div className="inc-dec-container">
              <button
                type="button"
                className="inc-button"
                onClick={this.onDecrement}
                disabled={isRunning}
              >
                -
              </button>
              <p className="span">{initialTimeInSeconds}</p>
              <button
                type="button"
                className="inc-button"
                onClick={this.onIncrement}
                disabled={isRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
