import React from 'react'

export const TextInput = ({ label,text,number, value, onChange }) => {
    return (
      <div>
        <label>{label}</label>
        <input
          type={text || number}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
}

export const TextArea = ({label,onChange}) => {
    return (
        <div>
            <label>{label}</label>
            <textarea
             value={value}
             onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export const RadioButton = ({}) => {
    return (
        <div>
            <label>{lable}</label>
            
        </div>
    )
}


