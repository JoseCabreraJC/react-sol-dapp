import React, {Component} from 'react';
import {render} from 'react-dom'

class AirdropTimer extends Component{
    constructor(props){
        super(props);
        this.state = {
            time: {},
            seconds: 20
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    airDropReleaseTokens() {
        let stakingBalance = this.props.stakingBalance
        if (stakingBalance >= '5000000000000000')
        this.startTimer() 
    }
    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            setInterval(this.countDown, 1000)            
        }
        //start timer
    }
    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds,
        })
        if (seconds === 0) {
            clearInterval(this.timer)
            // here we should add the tokens reward
            // issue mothod. Should be hard  
        }
    }
    secondsToTime(secs){
        let hours, minutes, seconds;
        hours = Math.floor( secs/ (60 * 60))
        let divisorForMinutes = secs % (60 * 60)
        minutes = Math.floor(divisorForMinutes / 60)
        let divisorForSeconds = divisorForMinutes % 60
        seconds = Math.ceil(divisorForSeconds)
        let obj = {
            'h':hours || 0,
            'm':minutes || 0,
            's':seconds || 0,
        }
        return obj
    }
    componentDidMount(){
        let timeLeft = this.secondsToTime(this.state.seconds)
        this.setState({timer: timeLeft})
    }
    render() {
        this.airDropReleaseTokens()
        return (
            <div className='card-body text-center' style={{color: 'black'}}>
                {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
            </div>
        )
    }
}

export default AirdropTimer