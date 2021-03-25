import { useState, useEffect } from 'react';

import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyModal from '../../../components/MyModal';
import AdminHeader from '../Shared/AdminHeader';

import * as S from './style';

import { FormHelper } from './formHelper';
import { TableHelper } from './tableHelper';

import { getAllAddressByIdOrIds, getAllAddress } from '../../../actions/addressActions';

const Address = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateAdressList, setUpdateAdressList] = useState(false);
    const [addressList, setAdressList] = useState(null);
    const [itemSelected, setItemSelected] = useState();
    const [resultIsFiltered, setResultIsFiltered] = useState(false);

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setUpdateAdressList(!updateAdressList);
    }

    useEffect(async () => {
        const customerIds = window.location.search.match(/(?<=customerid\=)[\d|,]+/gi)?.[0];
        try {
            let _addressList;
            if (customerIds)
                _addressList = await getAllAddressByIdOrIds(customerIds.split(',')).then(r => r.map(a => a.data));
            else
                _addressList = await getAllAddress().then(r => r.data);
            setAdressList(_addressList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de clientes ativos");
            console.log(error);
        }
    }, [updateAdressList])

    useEffect(() => {
        if(itemSelected) {
            setShowModal('aboutAddress')
        }
    }, [itemSelected])

    return (
        <S.PageWrapper>
            <AdminHeader />
            <main>
                <S.Container>
                    <div>
                        <div className="call-to-action">
                            <span className="title">ENDEREÇOS |</span>
                            {resultIsFiltered ? (
                                <SimpleTextAsButton onClick={() => {
                                    handleCloseModal(true);
                                    setResultIsFiltered(false);
                                }} >
                                    Limpar pesquisa
                                </SimpleTextAsButton>
                            ) : (
                                <>
                                    {/* <SimpleTextAsButton onClick={() => setShowModal('createAddress')} >
                                        + novo endereço
                                    </SimpleTextAsButton> */}
                                    <SimpleTextAsButton onClick={() => setShowModal('searchAddress')} >
                                        <i className="fas fa-search"></i> Pesquisa
                                    </SimpleTextAsButton>
                                </>
                            )}
                        </div>
                        <div className="table-group">
                            {addressList && <TableHelper data={addressList} type="activeAddress" selectItem={item => setItemSelected(item)} />}
                        </div>
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <FormHelper setResultIsFiltered={setResultIsFiltered} type={showModal} handleClose={handleCloseModal} setShowModal={setShowModal} itemSelected={itemSelected} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Address;
