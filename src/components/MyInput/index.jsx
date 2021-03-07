import * as S from './style';

const MyInput = ({
    value,
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
    const id = `id_inp_${name}`;
    
    return (
        <S.Wrapper halfSize={halfSize}>
            <input
                className={value ? 'fill ' : ''}
                name={name} type={type}
                id={id}
                required={required}
                onChange={e => handleChange(unMask(e))}
                value={mask(value)}
                {...props}
            />
            <label htmlFor={id} className={required ? 'is-required ' : ''}>{label}</label>
            <span className="warning-message">{errorMessage}</span>
        </S.Wrapper>
    )
}

export default MyInput;