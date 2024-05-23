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
const symbolsList = "!@#$%^&*()?";

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
            {/* <img src={arrowRight} className="arrow-right" alt="arrow-right"/> */}
            <svg
              className="arrow-right"
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#24232C"
                d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
