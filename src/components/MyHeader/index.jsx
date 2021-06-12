import { useSelector } from 'react-redux';
import MyButton from '../MyButton';
import { Link } from 'react-router-dom';
import * as S from './style';
import Logo from '../../assets/brands/LesVraria.svg';

const MyHeader = ({ children, cartExpireTime, authStatus = '' }) => {
    const storeUser = useSelector(store => store.user);
    const authStatusComputed = !!storeUser?.token || authStatus;

    const buttonByAuthStatus = {
        '': <Link to="/login" key="undefined"><MyButton>Entrar</MyButton></Link>,
        true: <Link to="/profile" key="logged"><MyButton>Conta</MyButton></Link>,
        'logging': <Link to="/signin" key="logging"><MyButton>Cadastrar</MyButton></Link>,
    };

    return (
        <S.Wrapper>
            <S.Container>
                <div className="header-items-group">
                    <Link to="/"><img className="logo" src={Logo} /></Link> 
                    {buttonByAuthStatus[authStatusComputed]}
                    <Link to="/cesta-produtos">
                        <MyButton><i className="fas fa-shopping-cart"><span></span></i></MyButton>
                    </Link>
                    {cartExpireTime?.value > 0 && (
                        <span className="cart-expire-display">
                            {`${cartExpireTime.text}${cartExpireTime.value / 1000} segundos`}
                        </span>
                    )}
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
