import React, { useRef } from 'react';
import * as S from './style';

const MySelect = ({ value, name = Math.random().toString(), label, placeholder, required, handleChange, children, halfSize, errorMessage = "verificar preenchimento"}) => {
    const input = useRef(null);
    const id = `id_inp_${name}`;

    const getValue = ({ target: { textContent, dataset: { value } } }) => {
        input.current.value = textContent;
        handleChange({ target: { value: value || textContent } });
    }

    return (
        <S.Wrapper halfSize={halfSize}>
            <input ref={input} name={name} type="text" id={id} required={required} autoComplete="off" readOnly placeholder={`${placeholder}${required ? '*' : ''}`} />
            {label && <label htmlFor={id} className={required ? 'is-required ' : ''}>{label}</label>}
            <span className="options" onClick={getValue}>
                {children}
            </span>
            <span className="adorn"><i className="fas fa-sort-down"></i></span>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MySelect;