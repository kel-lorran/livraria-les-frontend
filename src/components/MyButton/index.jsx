import * as S from './style';

export default ({ children, onClick, type = 'button'}) => {
    return (
        <S.CustomButton type={type} onClick={onClick}>
            {children}
        </S.CustomButton>
    )
}