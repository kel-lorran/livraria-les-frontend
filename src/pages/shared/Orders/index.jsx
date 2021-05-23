import { useState, useEffect } from 'react';

import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyTable from '../../../components/MyTable';

import * as S from './style';

import { ORDER_STATUS_TO_FILTER } from '../../../utils/data/constants'

import { defaultTableOptions } from './helper';
import ModalContentHelper from './ModalContentHelper'

import WithModal from '../../../hocs/withModal';

import { getAllOrders } from '../../../actions/orderActions';

const Orders = ({ setShowModal, fetchAgain, setModalContent, setItemSelected, handleCloseModal, isAdminPage }) => {
    const [orderList, setOrderList] = useState([]);
    const [resultIsFiltered, setResultIsFiltered] = useState(false);

    useEffect(async () => {
        try {
            const _orderList = await getAllOrders().then(r => r.data.filter(o => !ORDER_STATUS_TO_FILTER.includes(o.status)));
            setOrderList(_orderList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de pedidos");
            console.log(error);
        }
    }, [fetchAgain]);

    useEffect(() => setModalContent(props => props => <ModalContentHelper {...props} setList={setOrderList} setIsFiltered={setResultIsFiltered} isAdminPage={isAdminPage} />), []);

    return (
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
                        ) : isAdminPage && (
                            <>
                                <SimpleTextAsButton onClick={() => setShowModal('searchOrder')} >
                                    <i className="fas fa-search"></i> Pesquisa
                                </SimpleTextAsButton>
                            </>
                        )}
                    </div>
                    <div className="table-group">
                        {!!orderList.length && <MyTable data={orderList} onClick={item => {setItemSelected(item); setShowModal('aboutOrder')}} {...defaultTableOptions} maxHeight="250px" />}
                    </div>
                </div>
            </S.Container>
        </main>
    )
}

export default WithModal(Orders);
