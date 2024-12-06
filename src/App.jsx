import { useEffect, useState } from "react";
import "./App.css";
import InputTimer from "./inputTimer";

function App() {
  const [isStart, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timerId, setTimerId] = useState(null);

  // Handle Start
  const handleStart = () => {
    if (hours < 0 || min < 0 || sec < 0) {
      alert("Invalid input");
      return;
    }
    setStart(true);
  };

  // Reset Timer
  const handleReset = () => {
    setStart(false);
    setIsPaused(false);
    resetFunction();
  };

  // Resume Timer
  const handleResume = () => {
    setIsPaused(false);
    setStart(true);
  };

  // Pause Timer
  const handlePause = () => {
    clearInterval(timerId);
    setTimerId(null);
    setIsPaused(true);
  };

  // Reset Function
  const resetFunction = () => {
    setHours(0);
    setMin(0);
    setSec(0);
    clearInterval(timerId);
    setTimerId(null);
  };

  // Handle Input
  const handleInput = (e) => {
    const val = parseInt(e.target.value) || 0;
    const id = e.target.id;
    if (id === "hours") {
      setHours(val);
    } else if (id === "minutes") {
      setMin(val);
    } else {
      setSec(val);
    }
  };

  // Timer Logic
  const runTimer = () => {
    setSec((prevSec) => {
      if (prevSec > 0) {
        return prevSec - 1;
      } else if (prevSec === 0 && min > 0) {
        setMin((prevMin) => prevMin - 1);
        return 59;
      } else if (prevSec === 0 && min === 0 && hours > 0) {
        setHours((prevHours) => prevHours - 1);
        setMin(59);
        return 59;
      } else {
        // Timer is done
        handleReset();
        alert("Timer is finished");
        return 0;
      }
    });
  };

  // Timer Effect
  useEffect(() => {
    if (isStart && !isPaused) {
      const tid = setInterval(runTimer, 1000);
      setTimerId(tid);
      return () => clearInterval(tid);
    }
  }, [isStart, isPaused, min, hours]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {!isStart && <InputTimer handleInput={handleInput} handleStart={handleStart} />}
      {isStart && (
        <div className="showContainer">
          <div className="showBox">
            <div>{String(hours).padStart(2, "0")}</div>
            <span>:</span>
            <div>{String(min).padStart(2, "0")}</div>
            <span>:</span>
            <div>{String(sec).padStart(2, "0")}</div>
          </div>
          <div className="buttonContainer">
            {isPaused ? (
              <button className="showButton" onClick={handleResume}>
                Resume
              </button>
            ) : (
              <button className="showButton" onClick={handlePause}>
                Pause
              </button>
            )}
            <button className="showButton" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
