import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import Loader from '../../components/Loader';
import MyModal from '../../components/MyModal';

import * as S from './style.js';

import { inputMap } from './helper';
import ModalContentHelper from './ModalContentHelper';

import { getFullProfile } from '../../actions/customerActions';
import MyButton from '../../components/MyButton';

const Profile = ({ history }) => {
    const storeUser = useSelector(store => store.user);
    const [showModal, setShowModal] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [customer, setCustomer] = useState();

    const handleCloseModal = (shouldUpdate) => {
        setShowModal(false);
        if(shouldUpdate) setFetchAgain(!fetchAgain);
    }

    useEffect(async () => {
        if(storeUser) {
            const _customer = await getFullProfile().then(r => r.data[0]);
            setCustomer(_customer);
        }
    }, [storeUser, fetchAgain])

    const createDescriptionsList = (defaultHelper, item) => {
        return defaultHelper.map(step => step.reduce((ac, inp) => {
            return [...ac, <React.Fragment key={'dt' + inp.name}><dt>{inp.label || inp.placeholder}</dt><dd>{item[inp.name]}</dd><br /></React.Fragment>]
        }, []))
    }

    return customer ? (
        <S.PageWrapper>
            <ProfileHeader />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <div>
                            <MyButton onClick={() => setShowModal('updateProfile')}>Editar perfil</MyButton>
                            <MyButton>Excluir Conta</MyButton>
                        </div>
                    </S.Container>
                </S.SectionOne>
                <S.SectionTwo>
                    <S.Container>
                        <div>
                            <S.WrapperDescriptionList>{createDescriptionsList([inputMap[0]], customer)}</S.WrapperDescriptionList>
                        </div>
                    </S.Container>
                </S.SectionTwo>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <ModalContentHelper type={showModal} handleClose={handleCloseModal} itemSelected={customer} />
            </MyModal>
        </S.PageWrapper>
    ) : (
        <Loader />
    )
}

export default Profile;