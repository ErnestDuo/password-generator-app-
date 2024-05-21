import React,{useState,useEffect} from "react";
import "./passwordGenerator.css";
import copyIcon from "../img/Shape.svg";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import PasswordStrengthMeter from "./PasswordStrengthMeter";


const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberList = '0123456789';
const symbolsList = '!@#$%^&*()?';

export default function PasswordGenerator() {
  const [password , setPassword] = useState('');
    const  [lowerCase , setLowerCase] = useState(true);
    const  [upperCase , setUpperCase] = useState(true);
    const  [numbers , setNumbers] = useState(true);
    const  [symbols , setSymbols] = useState(true);
    const  [passwordLength , setPasswordLength] = useState(10);
    const [strength, setStrength] = useState(0);
    const [ copied , setCopied] = useState(false);

    useEffect(() => {
      if (copied) {
        const timer = setTimeout(() => setCopied(false), 2000); 
        return () => clearTimeout(timer); 
      }
    }, [copied])

    const generatePassword = () =>{

      let characterSet = '';
      if (upperCase){
        characterSet += uppercaseList;
      }
      if (lowerCase){
        characterSet += lowercaseList;
      }
      if (numbers){
        characterSet += numberList;
      }
      if (symbols){
        characterSet += symbolsList;
      }

      let tempPassword  = '';
      const characterSetLength = characterSet.length;
      
      for (let i = 0; i < passwordLength; i++){
        const characterIndex = Math.round(Math.random()* characterSetLength);
        tempPassword += characterSet.charAt(characterIndex);
      }
      setPassword(tempPassword);
      calculateStrength(tempPassword);
    }

    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[!@#$%^&*()?]/.test(password)) strength++;
  
      setStrength(strength > 4 ? 4 : strength);
    };


  return (

    <div className="container">
      <div className="header">
        <h3>Password Generator</h3>
      </div>

      <div className="text-area">
        <div className="password-wrapper">
          <input type="text" value={password} placeholder="P4$5W0rD!" disabled/>
          {copied && <span className="copy">Copied</span>}
          <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
          <img src={copyIcon} alt="copy" className="copy-icon" />
          </CopyToClipboard>
        </div>
      </div>

      <div className="interactive-components">
        <div className="setting">
          <div className="slider-content">
            <p className="rangeValue1">Character Length</p>
            <p className="rangeValue2">{passwordLength}</p>
          </div>
          <div className="slider">
            <input type="range" min={0} max={20} defaultValue={passwordLength} onChange={(event) => setPasswordLength(event.currentTarget.value)} />
          </div>
        </div>

        <div className="checkbox">
          <input type="checkbox" onChange={() => setUpperCase(!upperCase)} checked={upperCase} />
          <span className="check_box"></span>
          <label>Include Uppercase Letters</label>
        </div>

        

        <div className="checkbox">
          <input type="checkbox" onChange={() => setLowerCase(!lowerCase)} checked={lowerCase} />
          <label>Include Lowercase Letters</label>
        </div>

        <div className="checkbox">
          <input type="checkbox" onChange={() => setNumbers(!numbers)} checked={numbers}/>
          <label>Include Numbers</label>
        </div>

        <div className="checkbox">
          <input type="checkbox" onChange={() => setSymbols(!symbols)} checked={symbols}/>
          <label>Include Symbols</label>
        </div>

        <PasswordStrengthMeter strength={strength} />


        <div className="generatePassword">
        <button type="button" onClick={generatePassword}>GENERATE</button>
      </div>
      </div>

      
    </div>
  );
}