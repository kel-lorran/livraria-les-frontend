import * as S from './style';

const MyInput = ({
    id,
    value = '',
    name,
    label,
    required,
    handleChange,
    halfSize,
    type = 'text',
    errorMessage = "verificar preenchimento",
    mask = value => value,
    unMask = event => event,
    ...props
}) => {
    const idComputed = id || `id_inp_${name}`;
    
    return (
        <S.Wrapper halfSize={halfSize}>
            <input
                className={value ? 'fill ' : ''}
                name={name} type={type}
                id={idComputed}
                required={required}
                onChange={e => handleChange(unMask(e))}
                value={mask(value)}
                {...props}
            />
            <label htmlFor={idComputed} className={required ? 'is-required ' : ''}>{label}</label>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MyInput;