import { NavLink } from 'react-router-dom';
import Header from '../../../components/MyHeader';

import { logout } from '../../../utils';

export default (props) => (
    <Header {...props}>
        <NavLink to="/profile">Início</NavLink>
        <NavLink to={`/profile/endereco`}>Endereços</NavLink>
        <NavLink to={`/profile/cartao`}>Cartões</NavLink>
        <NavLink to={`/profile/meus-pedidos`}>Pedidos</NavLink>
        <a href="/" onClick={logout}>Sair</a>
    </Header>
);