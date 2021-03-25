import { useState, useEffect } from 'react';

import AdminHeader from '../Shared/AdminHeader'
import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyModal from '../../../components/MyModal';

import * as S from './style';

import { TableHelper } from './TableHelper';
import ModalContentHelper from './ModalContentHelper'

import { getAllOrders } from '../../../actions/orderActions';

const Orders = () => {
    const [showModal, setShowModal] = useState(false);
    const [resultIsFiltered, setResultIsFiltered] = useState(false);
    const [updateLists, setUpdateLists] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const [orderList, setOrderList] = useState();

    useEffect(async () => {
        try {
            const _orderList = await getAllOrders().then(r => r.data);
            setOrderList(_orderList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de pedidos");
            console.log(error);
        }
    }, [updateLists]);

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setUpdateLists(!updateLists);
    }

    useEffect(() => {
        if(itemSelected) {
            setShowModal('aboutOrder')
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
                                    <SimpleTextAsButton onClick={() => setShowModal('searchOrder')} >
                                        <i className="fas fa-search"></i> Pesquisa
                                    </SimpleTextAsButton>
                                </>
                            )}
                        </div>
                        <div className="table-group">
                            {orderList && <TableHelper data={orderList} type="defaultOrderTable" selectItem={item => setItemSelected(item)} />}
                        </div>
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <ModalContentHelper type={showModal} handleClose={handleCloseModal} itemSelected={itemSelected} setShowModal={setShowModal} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Orders;
