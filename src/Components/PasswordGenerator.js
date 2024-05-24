import React, { useState, useEffect } from "react";
import "./passwordGenerator.css";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import PasswordInput from "./PasswordInput";
import Checkbox from "./Checkbox";
import arrowRight from "../img/icon-arrow-right.svg";
import SliderComponent from "./Slider";

const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberList = "0123456789";
const symbolsList = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(10);
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const generatePassword = () => {
    let characterSet = "";
    if (upperCase) {
      characterSet += uppercaseList;
    }
    if (lowerCase) {
      characterSet += lowercaseList;
    }
    if (numbers) {
      characterSet += numberList;
    }
    if (symbols) {
      characterSet += symbolsList;
    }

    let tempPassword = "";
    const characterSetLength = characterSet.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterSetLength);
      tempPassword += characterSet.charAt(characterIndex);
    }
    setPassword(tempPassword);
    calculateStrength(tempPassword);
  };

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

      <PasswordInput
        password={password}
        copied={copied}
        setCopied={setCopied}
      />

      <div className="interactive-components">
        <SliderComponent
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
        />

        <Checkbox
          upperCase={upperCase}
          setUpperCase={setUpperCase}
          lowerCase={lowerCase}
          setLowerCase={setLowerCase}
          numbers={numbers}
          setNumbers={setNumbers}
          symbols={symbols}
          setSymbols={setSymbols}
        />

        <PasswordStrengthMeter strength={strength} />

        <div className="generatePassword">
          <button type="button" onClick={generatePassword}>
            GENERATE
            <img src={arrowRight} className="arrow-right" alt="arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
