import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
function App() {
  const [seconds, setSeconds] = useState("00");
  const [tens, setTens] = useState("00");
  const [isRunning, setIsRunning] = useState(false); 
  const intervalRef = useRef(null);

  const startTimer = () => {
    setTens((prevTens) => {
      let newTens = parseInt(prevTens) + 1;
      if (newTens < 10) {
        return "0" + newTens;
      }
      if (newTens > 99) {
        setSeconds((prevSeconds) => {
          let newSeconds = parseInt(prevSeconds) + 1;
          if (newSeconds < 10) {
            return "0" + newSeconds;
          }
          return newSeconds.toString();
        });
        return "00";
      }
      return newTens.toString();
    });
  };

  const start = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(startTimer, 10);
      setIsRunning(true); 
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setSeconds("00");
    setTens("00");
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); 
  }, []);
  return (
    <div className="container">
        <div className="bg-image">
            {/* <img className="img" src="./assets/stopwatch.jpg" alt="" srcset=""/> */}
        </div>
        <div className="calc">
            <h1>React Stopwatch</h1>
            <p><span className="seconds">{seconds}</span><span className="colon">:</span><span className="tens">{tens}</span> </p>
            <button className="start" onClick={start} disabled={isRunning}>Start</button>
            <button className="stop" onClick={stop}>Stop</button>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    </div>
  );
}

export default App;
