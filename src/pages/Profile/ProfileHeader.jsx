import { NavLink } from 'react-router-dom';
import Header from '../../components/MyHeader';

export default (props) => (
    <Header {...props}>
        <NavLink to="/profile">Início</NavLink>
        <NavLink to={`/profile/endereco`}>Endereços</NavLink>
        <NavLink to={`/profile/cartao`}>Cartões</NavLink>
    </Header>
);