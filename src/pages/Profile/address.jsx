import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SimpleTextAsButton from '../../components/SimpleTextAsButton';
import MyModal from '../../components/MyModal';
import ProfileHeader from './shared/ProfileHeader';

import * as S from './shared/style';

import { TableHelper } from './helper';

import { getFullProfile } from '../../actions/customerActions';
import ModalContentHelper from './ModalContentHelper';

const Address = () => {
    const [customer, setCustomer] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [itemSelected, setItemSelected] = useState();

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setFetchAgain(!fetchAgain);
    }

    useEffect(async () => {
        try {
            const _customer = await getFullProfile().then(r => r.data);
            setCustomer(_customer);
        } catch (error) {
            window.alert("Falha na obtenção da lista de endereços");
            console.log(error);
        }
    }, [fetchAgain])

    return (
        <S.PageWrapper>
            <ProfileHeader />
            <main>
                <S.Container>
                    <div>
                        <div className="call-to-action">
                            <SimpleTextAsButton onClick={() => {setItemSelected(customer); setShowModal('createAddress')}} >
                                + novo endereço
                            </SimpleTextAsButton>
                            {/* <SimpleTextAsButton onClick={() => {setItemSelected(customer); setShowModal('removeAddress')}} >
                                - remover endereços
                            </SimpleTextAsButton> */}
                        </div>
                        <div className="table-group">
                            {!!customer.addressList?.length && <TableHelper data={customer?.addressList} type="activeAddress" selectItem={item => {setItemSelected(item);setShowModal('aboutAddress')}} />}
                        </div>
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <ModalContentHelper type={showModal} handleClose={handleCloseModal} setShowModal={setShowModal} itemSelected={itemSelected} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Address;
