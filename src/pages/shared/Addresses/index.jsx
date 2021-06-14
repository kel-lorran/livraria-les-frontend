import { useState, useEffect } from 'react';

import SimpleTextAsButton from 'components/SimpleTextAsButton';
import MyTable from 'components/MyTable';

import * as S from './style';

import { tableOptionsAddress } from './helper';
import ModalContentHelper from './ModalContentHelper'

import WithModal from 'hocs/withModal';

import { getCustomerById, getFullProfile } from 'actions/customerActions';

const Orders = ({ setShowModal, fetchAgain, setModalContent, setItemSelected, handleCloseModal, isAdminPage }) => {
    const [customer, setCustomer] = useState({});
    const [resultIsFiltered, setResultIsFiltered] = useState(false);
    const customerId = window.location.search.match(/(?<=customerid\=)[\d|,]+/gi)?.[0];

    useEffect(async () => {
        let _customer;
        try {
            if (isAdminPage)
                _customer = await getCustomerById(customerId).then(r => r.data);
            else
                _customer = await getFullProfile().then(r => r.data);

            setCustomer(_customer);
        } catch (error) {
            window.alert("Falha na obtenção da lista de endereços");
            console.log(error);
        }
    }, [fetchAgain]);

    useEffect(() => setModalContent(() => props => <ModalContentHelper {...props} isAdminPage={isAdminPage} customerId={customerId} />), []);

    return (
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
                        {!!customer.addressList?.length && <MyTable data={customer?.addressList} onClick={item => {setItemSelected(item);setShowModal('aboutAddress')}} {...tableOptionsAddress} maxHeight="150px" />}
                    </div>
                </div>
            </S.Container>
        </main>
    )
}

export default WithModal(Orders);
