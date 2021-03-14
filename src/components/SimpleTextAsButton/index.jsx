import * as S from './style';

export default ({ children, onClick, type = 'button', fontSize = '24px', color = 'black', textTransform = 'uppercase', ...props}) => {
    return (
        <S.CustomButton {...props} type={type} onClick={onClick} fontSize={fontSize} color={color} textTransform={textTransform} >
            {children}
        </S.CustomButton>
    )
}