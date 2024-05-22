import React, { useState,useCallback,useEffect, useRef } from 'react';
import './App.css';
import userEvent from '@testing-library/user-event';
import Swal from 'sweetalert2'


function App() {

  const [length, setLength] = useState<any>(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')



  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) str += '0123456789'

    if(charAllowed) str += '~!@#$%^&*(}[{)]/><=+-'



    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
     

      pass += str.charAt(char)
    }

    setPassword(pass)


  },[length, numberAllowed, charAllowed,setPassword])


  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])


  // useRef Hook

  const passwordRef = useRef<HTMLInputElement>(null)

  const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    Swal.fire({
      title: "Password copied!",
      text: "",
      icon: "success"
    });
  }, [password])

  return (
    // <>
    // <div className='main'>
    // <h1>Password Generator</h1>
    // <div className="input">
    //   <input className='inputtext' type="text"
    //   value={password}
    //   placeholder='Password'
    //   readOnly
    //   ref={passwordRef}
    //   />
    //   <button onClick={copyPasswordToClipboard}>Copy</button>
    // </div>

    // <div className='secondDiv'>
    //   <div>

    // <input className='inputrange' type="range"
    // min={8}
    // max={20}
    // value={length}
    // onChange={(e)=>{setLength(e.target.value)}}
    // />
    // <label>length : ({length})</label>

    //   </div>

    // <div>

    // <input className='numbercheckbox' type="checkbox"
    // defaultChecked={numberAllowed}
    // id='numbercheckbox'
    // onChange={()=>{
    //   setNumberAllowed((prev) => !prev);
    // }}
    // />
    // <label htmlFor="numbercheckbox">Numbers</label>

    // </div>

    // <div>

    // <input className='numbercheckbox' type="checkbox"
    // defaultChecked={charAllowed}
    // id='charcheckbox'
    // onChange={()=>{
    //   setCharAllowed((prev) => !prev);
    // }}
    // />
    // <label htmlFor="charcheckbox">Characters</label>

    // </div>
    // </div>

    // </div>
    // </>

    <div className='main'>
      <h1>Password Generator</h1>
      <div className="input-container">
        <input
          className='input-text'
          type="text"
          value={password}
          placeholder='Your secure password'
          readOnly
          ref={passwordRef}
        />
        <button className='copy-button' onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <div className='controls'>
        <div className='control'>
          <label>Password Length: {length}</label>
          <input
            className='input-range'
            type="range"
            min={8}
            max={25}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
          />
        </div>

        <div className='control'>
          <input
            className='checkbox'
            type="checkbox"
            checked={numberAllowed}
            id='numbercheckbox'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numbercheckbox">Include Numbers</label>
        </div>

        <div className='control'>
          <input
            className='checkbox'
            type="checkbox"
            checked={charAllowed}
            id='charcheckbox'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charcheckbox">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
