import React, { useState, useMemo } from 'react';

import MyButton from 'components/MyButton';
import CustomForm from 'components/CustomForm';

import * as S from './style';
import { createDescriptionsList } from 'pages/shared/utils';
import { inputMap } from './helper';

import { saveNewAddress, updateAddress } from 'actions/addressActions';

export default ({ type, handleClose, itemSelected, setShowModal, isAdminPage, customerId }) => {
    const createAddressSubmit = async data => {
        await saveNewAddress(data, isAdminPage && customerId);
        handleClose(true);
    }

    const updateAddressSubmit = async data => {
        await updateAddress(data);
        handleClose(true);
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
        case 'aboutAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                        {/* <MyButton onClick={() => setShowModal('updateAddress')}>Editar</MyButton> */}
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
        
        default:
            return null;
    }
}
