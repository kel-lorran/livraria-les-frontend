import MyButton from '../MyButton';
import * as S from './style';
import Logo from '../../assets/brands/LesVraria.svg';

const MyHeader = ({ children }) => {
    return (
        <S.Wrapper>
            <S.Container>
                <div className="header-items-group">
                    <img className="logo" src={Logo} />
                    <MyButton>Entrar</MyButton>
                    <MyButton><i className="fas fa-shopping-cart"></i></MyButton>
                </div>
            </S.Container>
            {children && (
                <nav>
                    <S.Container>
                        {children}
                    </S.Container>
                </nav>
            )}
        </S.Wrapper>
    );
}

export default MyHeader;
