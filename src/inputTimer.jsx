const InputTimer = ({handleStart, handleInput}) => {

    return (
        <div className='inputContainer'>
         <div className='inputBox'>
           <input
            onChange={handleInput}
            id='hours' placeholder='HH'/>
           <input
           onChange={handleInput}
            id='minutes' placeholder='MM'/>
           <input
           onChange={handleInput}
            id='seconds' placeholder='SS'/>
         </div>
         <button className='timerButton' onClick={handleStart}>Start</button>
        </div>)
}
export default InputTimer