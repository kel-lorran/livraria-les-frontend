import ProfileHeader from 'pages/Profile/shared/ProfileHeader';
import OrdersPageMain from 'pages/shared/Orders';
import * as S from '../shared/style';

export default props => (
    <S.PageWrapper>
        <ProfileHeader />
        <OrdersPageMain {...props} />
    </S.PageWrapper>
);
