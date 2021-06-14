import AdminHeader from 'pages/Admin/shared/AdminHeader';
import AddressesPageMain from 'pages/shared/Addresses';
import * as S from './style';

export default props => (
    <S.PageWrapper>
        <AdminHeader />
        <AddressesPageMain {...props} isAdminPage />
    </S.PageWrapper>
);
