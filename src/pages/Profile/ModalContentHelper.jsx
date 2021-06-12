import React from 'react';

import CustomForm from '../../components/CustomForm';
import MyButton from '../../components/MyButton';
import SimpleTextAsButton from '../../components/SimpleTextAsButton';

import * as S from './shared/style';
import { createDescriptionsList } from '../shared/utils';
import { inputMap, inputMapCard, inputMapPersonData } from './helper';
import { logout } from 'utils';

import { updateCustomer } from '../../actions/customerActions';
import { updateAddress, saveNewAddress, deleteAddress } from '../../actions/addressActions';
import { saveNewCard, deleteCard } from '../../actions/cardActions';
import { deleteUser } from '../../actions/userActions';

export default ({ type, handleClose, itemSelected, setShowModal }) => {
    const updateCustomerWithoutAddressListSubmit = async data => {
        await updateCustomer({ ...itemSelected, ...data, birthDate: itemSelected.birthDate === data.birthDate ? null : data.birthDate  });
        handleClose(true);
    }

    const createAddressSubmit = async data => {
        await saveNewAddress(data)
        handleClose(true);
    }

    const createCardSubmit = async data => {
        await saveNewCard(data)
        handleClose(true);
    }

    const updateAddressSubmit = async data => {
        await updateAddress(data);
        handleClose(true);
    }

    const handleRemoveCard = async cardId => {
        await deleteCard(cardId);
        handleClose(true);
    }

    const deleteAccountSubmit = async () => {
        await deleteUser();
        logout();
    }

    // const makeListWithCheckBox = order => {
    //     return (itemSelected?.addressList || itemSelected).map((a) => {
    //         const key = a.addressLabel;
    //         const _id = `check_${a.id}`;
    //         return (
    //             <S.CustomLi key={key}>
    //                 <input id={_id} data-merchandiseide={a.id} type="checkbox" />
    //                 <label htmlFor={_id}>{`${a.addressLabel} - ${a.publicPlaceType} ${a.publicPlaceName}`}</label>
    //             </S.CustomLi>
    //         ) 
    //     })
    // }
    
    switch (type) {
        case 'updateProfile':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Alterar Perfil</h3>
                    </S.ModalHeader>
                    <CustomForm s="min-height: 20vh;" inputMap={[inputMapPersonData]} submmitButtonText="Atualizar"  item={itemSelected} onSubmit={updateCustomerWithoutAddressListSubmit} />
                </>
            )
        case 'aboutAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                        <MyButton onClick={() => setShowModal('updateAddress')}>Editar</MyButton>
                    </S.ModalHeader>
                    <S.WrapperDescriptionList>{createDescriptionsList([inputMap[1]], itemSelected)}</S.WrapperDescriptionList>
                </>
            )
        case 'createAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Novo endereço</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={[inputMap[1]]} onSubmit={createAddressSubmit} />
                </>
            )
        case 'updateAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Editar endereço</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={[inputMap[1]]} item={itemSelected} onSubmit={updateAddressSubmit} />
                </>
            )
        case 'removeAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Remover endereços</h3>
                    </S.ModalHeader>
                    {/* <form onSubmit={}>
                        <ul>
                            {makeListWithCheckBox(itemSelected)}
                        </ul>
                        <S.ModalFooter>
                            <MyButton onClick={() => handleClose()}>Cancelar</MyButton>
                            <MyButton type="submit">Confirmar</MyButton>
                        </S.ModalFooter>
                    </form> */}
                </>
            )
        case 'createCard':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Novo cartão</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={inputMapCard} onSubmit={createCardSubmit} />
                </>
            )
        case 'aboutCard':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                    </S.ModalHeader>
                    <S.WrapperDescriptionList>{createDescriptionsList(inputMapCard, itemSelected)}</S.WrapperDescriptionList>
                </>
            )
        case 'removeCard':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Remover Cartões</h3>
                    </S.ModalHeader>
                    <ul>
                        {(itemSelected?.card || itemSelected).map(c => <li key={c.label}><SimpleTextAsButton onClick={() => handleRemoveCard(c.id)} fontSize="16px" >{`Excluir - ${c.label} - ${c.creditCardCompany}`}</SimpleTextAsButton></li>)}
                    </ul>
                    
                </>
            )
        case 'deleteAccount':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Certeza que deseja deletar sua conta permanentemente?</h3>
                    </S.ModalHeader>
                    <S.ModalFooter>
                        <MyButton onClick={() => handleClose()}>Não</MyButton>
                        <MyButton onClick={deleteAccountSubmit}>Sim</MyButton>
                    </S.ModalFooter>
                </>
            )
        
        default:
            return null;
    }
}