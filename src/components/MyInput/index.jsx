import * as S from './style';

const MyInput = ({ value, name, label, required, handleChange, halfSize, type = 'text', errorMessage = "verificar preenchimento"}) => {
    const id = `id_inp_${name}`;

    return (
        <S.Wrapper halfSize={halfSize}>
            <input className={value !== undefined ? 'fill ' : ''} name={name} type={type} id={id} required={required} onChange={handleChange} value={value} />
            <label htmlFor={id} className={required ? 'is-required ' : ''}>{label}</label>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MyInput;