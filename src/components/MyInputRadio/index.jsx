import React from 'react';
import * as S from './style';

const MyInputRadio = ({ label, value: currentValue, name, options, handleChange, required }) => {
    return (
        <S.Wrapper>
            {label && <p className={required ? 'is-required ' : ''}>{label}</p>}
            {options.map(({ value, text }, i) => (
                <React.Fragment key={text}>
                    <input type="radio" onChange={handleChange} id={name+value} name={name} value={value} checked={value === currentValue} />
                    <label htmlFor={name+value}>{text}</label>
                </React.Fragment>
            ))}
        </S.Wrapper>
    )
}

export default MyInputRadio;