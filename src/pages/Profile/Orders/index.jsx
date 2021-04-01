import ProfileHeader from '../shared/ProfileHeader';
import OrdersPageMain from '../../shared/Orders';
import * as S from '../shared/style';

export default props => (
    <S.PageWrapper>
        <ProfileHeader />
        <OrdersPageMain {...props} />
    </S.PageWrapper>
);
