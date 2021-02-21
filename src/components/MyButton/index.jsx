import * as S from './style';

export default ({ children, handleClick, type = 'button'}) => {
    return (
        <S.CustomButton type={type} onClick={handleClick}>
            {children}
        </S.CustomButton>
    )
}