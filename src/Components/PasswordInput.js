import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../img/Shape.svg";


const PasswordInput = ({ password, copied, setCopied }) => {
  return (
    <div className="text-area">
      <div className="password-wrapper">
        <input type="text" value={password} placeholder="P4$5W0rD!" disabled />
        {copied && <span className="copy">Copied</span>}
        <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
          <img src={copyIcon} alt="copy" className="copy-icon" />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default PasswordInput;
