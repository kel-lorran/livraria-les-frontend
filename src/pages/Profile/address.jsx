import { useState, useEffect } from 'react';

import SimpleTextAsButton from '../../components/SimpleTextAsButton';
import MyModal from '../../components/MyModal';
import ProfileHeader from './ProfileHeader';

import * as S from './style';

import { TableHelper } from './helper';

import { getFullProfile } from '../../actions/customerActions';
import ModalContentHelper from './ModalContentHelper';

const Address = ({ match: { params }, profile }) => {
    const [customer, setCustomer] = useState();
    const loginStatus = profile ? 'logged' : '';
    const [showModal, setShowModal] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [itemSelected, setItemSelected] = useState();

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setFetchAgain(!fetchAgain);
    }

    useEffect(async () => {
        try {
            const _customer = await getFullProfile().then(r => r.data[0]);
            setCustomer(_customer);
        } catch (error) {
            window.alert("Falha na obtenção da lista de endereços");
            console.log(error);
        }
    }, [fetchAgain])

    return (
        <S.PageWrapper>
            <ProfileHeader authStatus={loginStatus}  />
            <main>
                <S.Container>
                    <div>
                        <div className="call-to-action">
                            <SimpleTextAsButton onClick={() => {setItemSelected(customer); setShowModal('createAddress')}} >
                                + novo endereço
                            </SimpleTextAsButton>
                            <SimpleTextAsButton onClick={() => {setItemSelected(customer); setShowModal('removeAddress')}} >
                                - remover endereços
                            </SimpleTextAsButton>
                        </div>
                        <div className="table-group">
                            {customer?.address && <TableHelper data={customer?.address} type="activeAddress" selectItem={item => {setItemSelected(item);setShowModal('aboutAddress')}} />}
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
