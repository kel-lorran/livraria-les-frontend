import { useState, useEffect } from 'react';

import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyModal from '../../../components/MyModal';
import AdminHeader from '../Shared/AdminHeader';

import * as S from './style';

import { FormHelper } from './formHelper';
import { TableHelper } from './tableHelper';

import { getAllBooksActives } from '../../../actions/bookActions';

const Books = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateBookList, setUpdateBookList] = useState(false);
    const [activeBookList, setActiveBookList] = useState(null);
    const [itemSelected, setItemSelected] = useState();

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setUpdateBookList(!updateBookList);
    }

    useEffect(async () => {
        try {
            const _activeBookList = await getAllBooksActives().then(r => r.data);
            setActiveBookList(_activeBookList);
        } catch (error) {
            window.alert("Falha na obtenção");
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
                            <SimpleTextAsButton onClick={() => setShowModal('createBook')} >
                                + novo livro
                            </SimpleTextAsButton>
                            <SimpleTextAsButton onClick={() => setShowModal('searchBook')} >
                                <i className="fas fa-search"></i> Pesquisa
                            </SimpleTextAsButton>
                        </div>
                        <div className="contents">
                            {activeBookList && <TableHelper data={activeBookList} type="activeBooks" selectItem={item => setItemSelected(item)} />}
                        </div>
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <FormHelper type={showModal} handleClose={handleCloseModal} itemSelected={itemSelected} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Books;
