import * as S from './style';

const MyTextarea = ({ label, required, handleChange, halfSize, type = 'text', errorMessage = "verificar preenchimento", ...props}) => {
    const id = `id_inp_${label}`;

    return (
        <S.Wrapper halfSize={halfSize}>
            <textarea type={type} id={id} required={required} onChange={handleChange} {...props} />
            <label htmlFor={id} className={required ? 'is-required ' : ''}>{label}</label>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MyTextarea;