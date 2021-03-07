import { useState } from 'react';

import SimpleTextAsButton from '../../../components/SimpleTextAsButton';
import MyModal from '../../../components/MyModal';
import AdminHeader from '../Shared/AdminHeader';

import * as S from './style';
import { FormHelper } from './formHelper';

const Books = () => {
    const [showModal, setShowModal] = useState(false);

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
                            <SimpleTextAsButton>
                                <i className="fas fa-search"></i> Pesquisa
                            </SimpleTextAsButton>
                        </div>
                        <div className="contents">
                            {/* <MyTable data={} /> */}
                        </div>
                    </div>
                </S.Container>
            </main>
            <MyModal show={showModal}>
                <FormHelper type={showModal} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Books;
