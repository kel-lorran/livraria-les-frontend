import { useState, useEffect } from 'react';

import SimpleTextAsButton from '../../components/SimpleTextAsButton';
import MyTable from '../../components/MyTable';
import ProfileHeader from './ProfileHeader';

import * as S from './style';

import { tableOptionsCard } from './helper';
import ModalContentHelper from './ModalContentHelper';

import WithModal from '../../hocs/withModal';

import { getFullProfile } from '../../actions/customerActions';

const Card = ({ setShowModal, fetchAgain, setModalContent, setItemSelected }) => {
    const [customer, setCustomer] = useState();

    useEffect(async () => {
        try {
            const _customer = await getFullProfile().then(r => r.data[0]);
            setCustomer(_customer);
        } catch (error) {
            window.alert("Falha na obtenção da lista de cartões");
            console.log(error);
        }
    }, [fetchAgain]);

    useEffect(() => setModalContent(props => props => <ModalContentHelper {...props} />), []);

    return (
        <S.PageWrapper>
            <ProfileHeader />
            <main>
                <S.Container>
                    <div>
                        <div className="call-to-action">
                            <SimpleTextAsButton onClick={() => {setItemSelected(customer); setShowModal('createCard')}} >
                                + novo cartão
                            </SimpleTextAsButton>
                            <SimpleTextAsButton onClick={() => {setItemSelected(customer); setShowModal('removeCard')}} >
                                - remover cartões
                            </SimpleTextAsButton>
                        </div>
                        <div className="table-group">
                            {customer?.card && <MyTable data={customer.card} onClick={item => {setItemSelected(item); setShowModal('aboutCard')}} {...tableOptionsCard} maxHeight="150px" />}
                        </div>
                    </div>
                </S.Container>
            </main>
        </S.PageWrapper>
    )
}
export default WithModal(Card);