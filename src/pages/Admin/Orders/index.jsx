import AdminHeader from 'pages/Admin/shared/AdminHeader';
import OrdersPageMain from 'pages/shared/Orders';
import * as S from './style';

export default props => (
    <S.PageWrapper>
        <AdminHeader />
        <OrdersPageMain {...props} isAdminPage />
    </S.PageWrapper>
);
