import React from "react";
import './Checkbox.css'

const Checkbox = ({
  upperCase,
  setUpperCase,
  lowerCase,
  setLowerCase,
  numbers,
  setNumbers,
  symbols,
  setSymbols,
}) => {
  return (
    <div className="setting">
      <div className="checkbox">
        <input
          type="checkbox"
          onChange={() => setUpperCase(!upperCase)}
          checked={upperCase}
        />
        <span className="check_box"></span>
        <label>Include Uppercase Letters</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          onChange={() => setLowerCase(!lowerCase)}
          checked={lowerCase}
        />
        <label>Include Lowercase Letters</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          onChange={() => setNumbers(!numbers)}
          checked={numbers}
        />
        <label>Include Numbers</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          onChange={() => setSymbols(!symbols)}
          checked={symbols}
        />
        <label>Include Symbols</label>
      </div>
    </div>
  );
};

export default Checkbox;
