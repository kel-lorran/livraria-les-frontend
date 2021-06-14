import React, { useState, useMemo } from 'react';

import CustomForm from 'components/CustomForm';

import * as S from './style';
import { inputMap } from './helper';

import { saveNewCoupon } from 'actions/cupomActions';

export default ({ type, handleClose, itemSelected, isAdminPage, customerId }) => {
    const createCouponSubmit = async data => {
        await saveNewCoupon(data);
        handleClose(true);
    }
    
    switch (type) {
        case 'createCoupon':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Novo Cupom</h3>
                    </S.ModalHeader>
                    <CustomForm s="min-height: 27vh;" inputMap={inputMap} onSubmit={createCouponSubmit} />
                </>
            )
        case 'removeCoupon':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Remover Cupom</h3>
                    </S.ModalHeader>
                </>
            )
        
        default:
            return null;
    }
}
