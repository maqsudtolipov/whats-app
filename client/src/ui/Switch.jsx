import './Switch.scss';
import { useState } from 'react';

const Switch = ({ onToggle, checked }) => {
  const [isChecked, setIsChecked] = useState(!!checked);

  const handleCheck = () => {
    onToggle();
    setIsChecked(!isChecked);
  };

  return (
    <label className="switch" htmlFor="switch">
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleCheck}
      />
      <div className="switch__fill"></div>
    </label>
  );
};

export default Switch;
