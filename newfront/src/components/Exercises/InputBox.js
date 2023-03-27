import React from "react";


const InputBox = ({ index, value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value, index)}
      className="input-box"
    />
  );
};

export default InputBox