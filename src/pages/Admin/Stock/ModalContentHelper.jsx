import React, { useState } from 'react';
import CustomForm from '../../../components/CustomForm';

import * as S from './style';

import { incrementStock, decrementStock } from '../../../actions/merchandiseActions';

import { inputMap, inputMapToDecrement } from './helper';

export default ({ type, handleClose, itemSelected, setShowModal, setList, setActiveList, setInactiveList, setResultIsFiltered }) => {
    const incrementMerchandiseSubmit = async data => {
        await incrementStock(data);
        handleClose(true);
    }

    const decrementMerchandiseSubmit = async data => {
        await decrementStock({ ...data, bookId: itemSelected.book.id });
        handleClose(true);
    }

    switch (type) {
        case 'incrementMerchandise':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Entrada de produto</h3>
                    </S.ModalHeader>
                    <CustomForm s="min-height: 42vh;" inputMap={inputMap} onSubmit={incrementMerchandiseSubmit} />
                </>
            )
        case 'decrementMerchandise':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Saída manual de produto</h3>
                    </S.ModalHeader>
                    <CustomForm s="min-height: 20vh;" inputMap={inputMapToDecrement(itemSelected.quantity)} onSubmit={decrementMerchandiseSubmit} />
                </>
            )    
        default:
            return null
    }
}