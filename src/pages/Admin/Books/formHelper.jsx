import CustomForm from '../../../components/CustomForm';

import { saveNewBook } from '../../../actions/bookActions';

import * as S from './style';
import { inputMap } from './helper';
import React from 'react';
import MyButton from '../../../components/MyButton';

export const FormHelper = ({ type, handleClose, itemSelected }) => {
    const createBookSubmit = async data => {
        await saveNewBook({ ...data, active: true })
        handleClose();
    }

    const createDesciptionsList = (defaultHelper, item) => {

        return defaultHelper.map(step => step.reduce((ac, inp) => {
            // return [...ac, {
            //     ...inp,
            //     componentName: 'MyTextarea',
            //     defaultValue: item[inp.name],
            //     row: 1,
            //     readOnly: true
            // }]
            return [...ac, <React.Fragment key={'dt' + inp.name}><dt>{inp.name}</dt><dd>{item[inp.name]}</dd></React.Fragment>]
        }, []))
    } 

    switch (type) {
        case 'createBook':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Novo livro</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={inputMap} onSubmit={createBookSubmit} />
                </>
            )
        case 'searchBook':
                return null
        case 'aboutBook':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                        <MyButton>Editar</MyButton>
                        <MyButton>Inativar</MyButton>
                    </S.ModalHeader>
                    <S.WrapperDescriptionList>{createDesciptionsList(inputMap, itemSelected)}</S.WrapperDescriptionList>
                </>
            )
        default:
            return null
    }
}