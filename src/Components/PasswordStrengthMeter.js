import React from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ strength }) => {
  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
        return {label:'', color:''}
      case 1:
        return { label: 'TOO WEAK!', color: '#F64A4A' };
      case 2:
        return { label: 'WEAK', color: '#FB7C58' };
      case 3:
        return { label: 'MEDIUM', color: '#F8CD65' };
      case 4:
        return { label: 'STRONG', color: '#A4FFAF' };
      default:
        return { label: '', color: '' };
    }
  };

  const { label, color } = getStrengthLabel();

  return (
    <div className="strength-meter">
      <p className='str'>STRENGTH</p>

      <p className="strength-label" >{label}</p>
      <div className="strength-indicator">
        <span style={{ backgroundColor: strength >= 1 ? color : '' }}></span>
        <span style={{ backgroundColor: strength >= 2 ? color : '' }}></span>
        <span style={{ backgroundColor: strength >= 3 ? color : '' }}></span>
        <span style={{ backgroundColor: strength >= 4 ? color : '' }}></span>
      </div>

    </div>
  );
};

export default PasswordStrengthMeter;
