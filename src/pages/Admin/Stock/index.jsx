import { useState, useEffect } from 'react';

import AdminHeader from '../Shared/AdminHeader'
import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyModal from '../../../components/MyModal';

import * as S from './style';

import { FormHelper } from './formHelper';

import { getAllMerchandise } from '../../../actions/merchandiseActions';

const Stock = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateMerchandiseList, setUpdateMerchandiseList] = useState(false);
    const [merchandiseList, setMerchandiseList] = useState();
    const [resultIsFiltered, setResultIsFiltered] = useState(false);

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setUpdateMerchandiseList(!updateMerchandiseList);
    }

    useEffect(async () => {
        try {
            const _merchandiseList = await getAllMerchandise().then(r => r.data);
            setMerchandiseList(_merchandiseList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de mercadorias");
            console.log(error);
        }
    }, [updateMerchandiseList])

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
                                    <SimpleTextAsButton onClick={() => setShowModal('incrementMerchandise')} >
                                        + entrada de mercadoria
                                    </SimpleTextAsButton>
                                    <SimpleTextAsButton onClick={() => setShowModal('searchMerchandise')} >
                                        <i className="fas fa-search"></i> Pesquisa
                                    </SimpleTextAsButton>
                                </>
                            )}
                        </div>
                        {/* <div className="table-group">
                            {activeCustomerList && <TableHelper data={activeCustomerList} type="activeCustomers" selectItem={item => setItemSelected(item)} />}
                            {inactiveCustomerList && <TableHelper data={inactiveCustomerList} type="inactiveCustomers" selectItem={item => setItemSelected(item)} />}
                        </div> */}
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <FormHelper setResultIsFiltered={setResultIsFiltered} setList={setMerchandiseList} type={showModal} handleClose={handleCloseModal} setShowModal={setShowModal} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Stock;
