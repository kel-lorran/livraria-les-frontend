import * as S from './style';

export default ({ children, onClick, type = 'button', ...props }) => {
    return (
        <S.CustomButton {...props} type={type} onClick={onClick}>
            {children}
        </S.CustomButton>
    )
}