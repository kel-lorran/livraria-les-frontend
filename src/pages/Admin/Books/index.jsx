import { useState, useEffect } from 'react';

import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyModal from '../../../components/MyModal';
import AdminHeader from '../Shared/AdminHeader';

import * as S from './style';

import { FormHelper } from './formHelper';
import { TableHelper } from './tableHelper';

import { getAllBooksActives, getAllBooksInactives } from '../../../actions/bookActions';

const Books = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateBookList, setUpdateBookList] = useState(false);
    const [activeBookList, setActiveBookList] = useState(null);
    const [inactiveBookList, setInactiveBookList] = useState(null);
    const [itemSelected, setItemSelected] = useState();
    const [resultIsFiltered, setResultIsFiltered] = useState(false);

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setUpdateBookList(!updateBookList);
    }

    useEffect(async () => {
        try {
            const _activeBookList = await getAllBooksActives().then(r => r.data);
            setActiveBookList(_activeBookList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de produtos ativos");
            console.log(error);
        }
    }, [updateBookList])

    useEffect(async () => {
        try {
            const _inactiveBookList = await getAllBooksInactives().then(r => r.data);
            setInactiveBookList(_inactiveBookList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de produtos inativos");
            console.log(error);
        }
    }, [updateBookList])

    useEffect(() => {
        if(itemSelected) {
            setShowModal('aboutBook')
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
                                    <SimpleTextAsButton onClick={() => setShowModal('createBook')} >
                                        + novo livro
                                    </SimpleTextAsButton>
                                    <SimpleTextAsButton onClick={() => setShowModal('searchBook')} >
                                        <i className="fas fa-search"></i> Pesquisa
                                    </SimpleTextAsButton>
                                </>
                            )}
                        </div>
                        <div className="table-group">
                            {activeBookList && <TableHelper data={activeBookList} type="activeBooks" selectItem={item => setItemSelected(item)} />}
                            {inactiveBookList && <TableHelper data={inactiveBookList} type="inactiveBooks" selectItem={item => setItemSelected(item)} />}
                        </div>
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <FormHelper setResultIsFiltered={setResultIsFiltered} setActiveBookList={setActiveBookList} setInactiveBookList={setInactiveBookList} type={showModal} handleClose={handleCloseModal} setShowModal={setShowModal} itemSelected={itemSelected} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Books;
