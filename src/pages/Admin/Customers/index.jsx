import { useState, useEffect } from 'react';

import AdminHeader from '../shared/AdminHeader';
import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyModal from '../../../components/MyModal';

import * as S from './style';

import { FormHelper } from './formHelper';
import { TableHelper } from './tableHelper';

import { getAllCustomersActives, getAllCustomersInactives } from '../../../actions/customerActions';

const Customers = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateCustomerList, setUpdateCustomerList] = useState(false);
    const [activeCustomerList, setActiveCustomerList] = useState([]);
    const [inactiveCustomerList, setInactiveCustomerList] = useState([]);
    const [itemSelected, setItemSelected] = useState();
    const [resultIsFiltered, setResultIsFiltered] = useState(false);

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setUpdateCustomerList(!updateCustomerList);
    }

    useEffect(async () => {
        try {
            const _activeCustomerList = await getAllCustomersActives().then(r => r.data);
            setActiveCustomerList(_activeCustomerList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de clientes ativos");
            console.log(error);
        }
    }, [updateCustomerList])

    useEffect(async () => {
        try {
            const _inactiveCustomerList = await getAllCustomersInactives().then(r => r.data);
            setInactiveCustomerList(_inactiveCustomerList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de clientes inativos");
            console.log(error);
        }
    }, [updateCustomerList])

    useEffect(() => {
        if(itemSelected) {
            setShowModal('aboutCustomer')
        }
    }, [itemSelected])

    return (
        <S.PageWrapper>
            <AdminHeader />
            <main>
                <S.Container>
                    <div>
                        <div className="call-to-action">
                            {resultIsFiltered ? (
                                <SimpleTextAsButton onClick={() => {
                                    handleCloseModal(true);
                                    setResultIsFiltered(false);
                                }} >
                                    Limpar pesquisa
                                </SimpleTextAsButton>
                            ) : (
                                <>
                                    <SimpleTextAsButton onClick={() => setShowModal('createCustomer')} >
                                        + novo cliente
                                    </SimpleTextAsButton>
                                    <SimpleTextAsButton onClick={() => setShowModal('searchCustomer')} >
                                        <i className="fas fa-search"></i> Pesquisa
                                    </SimpleTextAsButton>
                                </>
                            )}
                        </div>
                        <div className="table-group">
                            {!!activeCustomerList.length && <TableHelper data={activeCustomerList} type="activeCustomers" selectItem={item => setItemSelected(item)} />}
                            {!!inactiveCustomerList.length && <TableHelper data={inactiveCustomerList} type="inactiveCustomers" selectItem={item => setItemSelected(item)} />}
                        </div>
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <FormHelper setResultIsFiltered={setResultIsFiltered} setActiveCustomerList={setActiveCustomerList} setInactiveCustomerList={setInactiveCustomerList} type={showModal} handleClose={handleCloseModal} setShowModal={setShowModal} itemSelected={itemSelected} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Customers;
