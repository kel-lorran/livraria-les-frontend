import MyButton from '../MyButton';
import * as S from './style';
import Logo from '../../assets/brands/LesVraria.svg';

const MyHeader = () => {
    return (
        <S.Wrapper>
            <S.Container>
                <img className="logo" src={Logo} />
                <MyButton>Entrar</MyButton>
                <MyButton><i className="fas fa-shopping-cart"></i></MyButton>
            </S.Container>
        </S.Wrapper>
    );
}

export default MyHeader;
