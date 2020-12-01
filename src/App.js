import React from 'react';
import './App.css';
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minute: 25,
      second: '00',
      isBreak: false,
      isRunning: false 
    };
  }
  getBreakLength = (button) =>{
    const  { breakLength, sessionLength } = this.state;
      switch(button){
        case 'break-up':
          if(breakLength < 60){
            this.setState({
              breakLength : breakLength + 1
            });
          }
          break;
        case 'break-down':
          if(this.state.breakLength > 0){
            this.setState({
              breakLength : breakLength -  1
            });
          }
          break;
        case 'session-up':
          if(sessionLength < 60){
            this.setState({
              sessionLength: sessionLength + 1,
              minute: sessionLength + 1
            });
           }
           break;
        case 'session-down':  
          if(sessionLength > 0){
            this.setState({
              sessionLength: sessionLength - 1,
              minute: sessionLength - 1
            });
          }
          break;
        default:
          break;  
      }
    }
  startSession = () =>{
    if(this.interval === undefined){
      this.interval = setInterval(()=> {
        if(parseInt(this.state.second) === 0){
          if(this.state.minute === 0){
            if(this.state.breakLength > 0 && !this.state.isBreak){
              this.setState({
                minute: this.state.breakLength,
                isBreak: true,
                isRunning: true
              })
            }else if(this.state.isBreak){
              clearInterval(this.interval);
              this.interval = undefined;
              this.setState({
                isRunning: false
              });
            }
            
          }else{
            this.setState({
              second: '59',
              minute: this.state.minute - 1,
              isRunning: true
            });
          }
        }else{
          this.setState({
          second: parseInt(this.state.second) - 1 < 10 ?
                  '0'+(parseInt(this.state.second) - 1).toString()
                  :parseInt(this.state.second) - 1,
          isRunning: true
        });
      }
    },1000);
    }
  }
    endSession = () =>{
      clearInterval(this.interval);
      this.interval = undefined;
      this.setState({
        isRunning: false
      })
    }
    clear = () =>{
      clearInterval(this.interval);
      this.interval = undefined;
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        minute: 25,
        second: '00',
        isBreak: false,
        isRunning: false
      });
    }
  render(){
    const inputStyle = {
      borderStyle: 'solid',
      height: '15em',
      width: '15em',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '50%',
      borderColor: 'green'
    }
    if(this.state.isBreak){
      inputStyle.borderColor = 'red';
    }
    console.log(this.interval);
    return(
      <div className='container'>
        <h1 className='heading'>25 + 5 Clock</h1>
        <div className='top-container'>
          <div className='p'>
            <h3 className='sub-heading'>Break Length</h3>
            <div className='s'>
              <button name='break-down'
                      className='arrow'
                      disabled={this.state.isRunning === true}
                      onClick={e=>this.getBreakLength(e.target.name)}>-
              </button>
              <h4>{this.state.breakLength}</h4>         
              <button name='break-up'
                      className='arrow'
                      disabled={this.state.isRunning === true}
                      onClick={e=>this.getBreakLength(e.target.name)}>+
              </button>
            </div>
          </div>
          <div className='p'>
          <h3 className='sub-heading'>Session Length</h3>
          <div className='s'>
            <button name='session-down'
                    className='arrow'
                    disabled={this.state.isRunning === true}
                    onClick={e=>this.getBreakLength(e.target.name)}>-
            </button>
            <h4>{this.state.sessionLength}</h4>
            <button name='session-up'
                    className='arrow'
                    disabled={this.state.isRunning === true} 
                    onClick={e=>this.getBreakLength(e.target.name)}>+
            </button>
          </div>
          </div>
        </div>
        <div  style={inputStyle}>
        <h1 className='time'>{this.state.minute}:</h1>
        <h1 className='time'>{this.state.second}</h1>
        </div>
        <div className='bottom-container'>
          <button className='timer-control' onClick={this.state.isRunning? this.endSession : this.startSession}>START/STOP</button>
          <button className='timer-control' onClick={this.clear}>RESET</button>
        </div>
      </div>
    )
  }
}

export default App;
