import ProfileHeader from 'pages/Profile/shared/ProfileHeader';
import AddressesPageMain from 'pages/shared/Addresses';
import * as S from './style';

export default props => (
    <S.PageWrapper>
        <ProfileHeader />
        <AddressesPageMain {...props} />
    </S.PageWrapper>
);
