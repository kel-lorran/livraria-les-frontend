import { useState, useEffect } from 'react';

import AdminHeader from '../shared/AdminHeader'
import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyTable from '../../../components/MyTable';

import * as S from './style';

import ModalContentHelper from './ModalContentHelper';
import { tableOptions } from './helper';

import WithModal from '../../../hocs/withModal';

import { getAllMerchandise } from '../../../actions/merchandiseActions';

const Stock = ({ setShowModal, fetchAgain, setModalContent, handleCloseModal }) => {
    const [merchandiseList, setMerchandiseList] = useState();
    const [resultIsFiltered, setResultIsFiltered] = useState(false);

    useEffect(async () => {
        try {
            const _merchandiseList = await getAllMerchandise().then(r => r.data);
            setMerchandiseList(_merchandiseList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de mercadorias");
            console.log(error);
        }
    }, [fetchAgain])

    useEffect(() => setModalContent(props => props => <ModalContentHelper {...props} />), []);

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
                                    {/* <SimpleTextAsButton onClick={() => setShowModal('searchMerchandise')} >
                                        <i className="fas fa-search"></i> Pesquisa
                                    </SimpleTextAsButton> */}
                                </>
                            )}
                        </div>
                        <div className="table-group">
                            {merchandiseList && <MyTable data={merchandiseList} {...tableOptions} maxHeight="150px" />}
                        </div>
                    </div>
                </S.Container>
            </main>
        </S.PageWrapper>
    )
}

export default WithModal(Stock);
