import * as S from './style';

const MyInput = ({ label, required, handleChange, halfSize, type = 'text', errorMessage = "verificar preenchimento"}) => {
    const id = `id_inp_${label}`;

    return (
        <S.Wrapper halfSize={halfSize}>
            <input type={type} id={id} required={required} onChange={handleChange} />
            <label htmlFor={id} className={required ? 'is-required ' : ''}>{label}</label>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MyInput;