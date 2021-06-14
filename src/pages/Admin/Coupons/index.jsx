import { useState, useEffect } from 'react';

import AdminHeader from 'pages/Admin/shared/AdminHeader';
import SimpleTextAsButton from 'components/SimpleTextAsButton';
import MyTable from 'components/MyTable';

import * as S from './style';

import { defaultTableOptions } from './helper';
import ModalContentHelper from './ModalContentHelper'

import WithModal from 'hocs/withModal';

import { getAllPromotionalCupons } from 'actions/cupomActions';

const Coupons = ({ setShowModal, fetchAgain, setModalContent, setItemSelected, handleCloseModal, isAdminPage }) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        try {
            const _couponList = await getAllPromotionalCupons().then(r => r.data);
            setCouponList(_couponList);
        } catch (error) {
            window.alert("Falha na obtenção dos cupons");
            console.log(error);
        }
    }, [fetchAgain]);

    useEffect(() => setModalContent(() => props => <ModalContentHelper {...props} isAdminPage={isAdminPage} />), []);

    return (
        <S.PageWrapper>
            <AdminHeader />
            <main>
                <S.Container>
                    <div>
                        <div className="call-to-action">
                            <SimpleTextAsButton onClick={() => setShowModal('createCoupon')} >
                                + novo cupom
                            </SimpleTextAsButton>
                        </div>
                        <div className="table-group">
                            {!!couponList.length && <MyTable data={couponList} {...defaultTableOptions} maxHeight="250px" />}
                        </div>
                    </div>
                </S.Container>
            </main>
        </S.PageWrapper>
    )
}

export default WithModal(Coupons);
