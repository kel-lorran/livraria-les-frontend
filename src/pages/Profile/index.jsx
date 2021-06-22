import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileHeader from './shared/ProfileHeader';
import Loader from '../../components/Loader';
import MyButton from '../../components/MyButton';

import * as S from './shared/style.js';

import { inputMapPersonData } from './helper';
import ModalContentHelper from './ModalContentHelper';
import { personDataParses, createDescriptionsList } from '../shared/utils';
import WithModal from '../../hocs/withModal';

import { getFullProfile } from '../../actions/customerActions';
import { getAllCupons } from '../../actions/cupomActions';


const Profile = ({ setShowModal, fetchAgain, setModalContent, setItemSelected, handleCloseModal, isAdminPage }) => {
    const storeUser = useSelector(store => store.user);
    const [customer, setCustomer] = useState();
    const [cupons, setCupons] = useState([]);

    useEffect(async () => {
        if(storeUser.token) {
            const _customer = await getFullProfile().then(r => r.data);
            setCustomer(_customer);
            setItemSelected(_customer);
        }
    }, [storeUser, fetchAgain])

    useEffect(async () => {
        if(storeUser.token) {
            const _cupons = await getAllCupons().then(r => r.data.filter(({ type }) => type !== 'promotional'));
            setCupons(_cupons)
        }
    }, [storeUser, fetchAgain])

    useEffect(() => setModalContent(props => props => <ModalContentHelper {...props} />), []);

    return customer ? (
        <S.PageWrapper>
            <ProfileHeader />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <div>
                            <MyButton onClick={() => setShowModal('updateProfile')}>Editar perfil</MyButton>
                            {/* <MyButton>Excluir Conta</MyButton> */}
                        </div>
                    </S.Container>
                </S.SectionOne>
                <S.SectionTwo>
                    <S.Container>
                        <div>
                            <S.WrapperDescriptionList className="person-data-description-list">{createDescriptionsList([inputMapPersonData], customer, personDataParses)}</S.WrapperDescriptionList>
                        </div>
                    </S.Container>
                </S.SectionTwo>
                {!!cupons.length && <S.SectionThree>
                    <S.Container>
                        <div>
                            <h3>Meu Cupons</h3>
                            {cupons.map(({ code, value, status }) => (
                                <p className="cupom-item" key={code}>
                                    <span className="code">{code}</span>
                                    <span className="value">R${value}</span>
                                    <span className="status">{status}</span>
                                </p>
                            ))}
                        </div>
                    </S.Container>
                </S.SectionThree>}
            </main>
        </S.PageWrapper>
    ) : (
        <Loader />
    )
}

export default WithModal(Profile);