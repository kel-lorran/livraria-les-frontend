import React, { useState } from 'react';
import CustomForm from '../../../components/CustomForm';

import * as S from './style';

import { incrementStock } from '../../../actions/merchandiseActions';

import { inputMap } from './helper';

export const FormHelper = ({ type, handleClose, itemSelected, setShowModal, setList, setActiveList, setInactiveList, setResultIsFiltered }) => {
    const [stepCurrent, setStepCurrent] =  useState(1);
    const [dataToSend, setDataToSend] = useState();

    const incrementMerchandiseSubmit = async data => {
        await incrementStock(data);
        handleClose(true);
    }

    switch (type) {
        case 'incrementMerchandise':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Entrada de produto</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={inputMap} onSubmit={incrementMerchandiseSubmit} />
                </>
            )
        default:
            return null
    }
}