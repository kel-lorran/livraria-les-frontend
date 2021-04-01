import AdminHeader from '../shared/AdminHeader';
import OrdersPageMain from '../../shared/Orders';
import * as S from './style';

export default props => (
    <S.PageWrapper>
        <AdminHeader />
        <OrdersPageMain {...props} isAdminPage />
    </S.PageWrapper>
);
