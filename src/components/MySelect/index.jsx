import * as S from './style';

const MySelect = ({ label, placeholder, required, handleChange, children, halfSize, errorMessage = "verificar preenchimento"}) => {
    const id = `id_inp_${label}`;

    return (
        <S.Wrapper halfSize={halfSize}>
            <input type="text" id={id} required={required} onChange={handleChange} autoComplete="off" readOnly placeholder={placeholder} />
            {label && <label htmlFor={id} className={required ? 'is-required ' : ''}>{label}</label>}
            <span className="options">
                {children}
            </span>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MySelect;