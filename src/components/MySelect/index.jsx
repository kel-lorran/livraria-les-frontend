import React, { useRef, useState, useEffect } from 'react';
import * as S from './style';

const MySelect = ({ value = '', name = Math.random().toString(), label, placeholder, required, handleChange = () => null, children, halfSize, errorMessage = "verificar preenchimento", ...props }) => {
    const [displayText, setDisplayText] = useState(value)
    const options = useRef(null);
    const id = `id_inp_${name}`;

    const getValue = ({ target: { textContent, dataset: { value } } }) => {
        handleChange({ target: { value: value || textContent } });
    }

    const getText = () => {
        const _options = options?.current?.children;
        let result;
        if(_options && value)
            result = [..._options].find(o => o.dataset.value == value || o.textContent == value)?.textContent || '';
        else
            result = '';
        setDisplayText(result);
    }

    useEffect(getText, [value, children])

    return (
        <S.Wrapper halfSize={halfSize}>
            <input {...props} value={displayText}  name={name} type="text" id={id} required={required} autoComplete="off" readOnly placeholder={`${placeholder}${required ? '*' : ''}`} />
            {label && <label htmlFor={id} className={required ? 'is-required ' : ''}>{label}</label>}
            <span ref={options} className="options" onClick={getValue}>
                {children}
            </span>
            <span className="adorn"><i className="fas fa-sort-down"></i></span>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MySelect;