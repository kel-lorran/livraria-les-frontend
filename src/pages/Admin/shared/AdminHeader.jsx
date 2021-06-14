import { NavLink } from 'react-router-dom';
import Header from '../../../components/MyHeader';

export default () => (
    <Header>
        <NavLink to="/admin">Início</NavLink>
        <NavLink to="/admin/livros">Livros</NavLink>
        <NavLink to="/admin/clientes">Clientes</NavLink>
        <NavLink to="/admin/pedidos">Pedidos</NavLink>
        <NavLink to="/admin/estoque">Estoque</NavLink>
        <NavLink to="/admin/cupoms">Cupons</NavLink>
    </Header>
);