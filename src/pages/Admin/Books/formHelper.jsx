import React from 'react';
import CustomForm from '../../../components/CustomForm';

import { saveNewBook, updateBook, searchBooks, updateStatusBook, getBookById } from '../../../actions/bookActions';

import * as S from './style';
import { inputMap, inputMapToInativation, inputMapToAtivation, inputMapToShowStatus, inputMapToSearch } from './helper';
import MyButton from '../../../components/MyButton';

export const FormHelper = ({ type, handleClose, itemSelected, setShowModal, setActiveBookList, setInactiveBookList, setResultIsFiltered }) => {
    const createBookSubmit = async data => {
        await saveNewBook(data);
        handleClose(true);
    }

    const updateBookSubmit = async data => {
        await updateBook(data);
        handleClose(true);
    }

    const inactiveBookSubmit  = async data => {
        await updateStatusBook({ ...data, active: 0});
        handleClose(true);
    }

    const activeBookSubmit  = async data => {
        await updateStatusBook({ ...data, active: 1});
        handleClose(true);
    }

    const searchBookSubmit = async ({ id, ...data }) => {
        try {
            if (!id) {
                const search = status => Object.entries(data).reduce((ac, [key, value], i) => {
                    return value ? ac += `&${key}=${value}` : ac;
                },`?active=${status}`);
    
                const results = [searchBooks(search(1)).then(r => r.data), searchBooks(search(0)).then(r => r.data)];
                const [resultSearchActives, resultSearchInactives] = await Promise.all(results);
    
                setActiveBookList(resultSearchActives);
                setInactiveBookList(resultSearchInactives);
            } else {
                const book = await getBookById(id).then(r => r.data);
                setActiveBookList(book.active === 1 ? [book] : []);
                setInactiveBookList(book.active === 0 ? [book] : []);
            }
            setResultIsFiltered(true);
        } catch (error) {
            window.alert("Falha na pesquisa");
            console.log(error);
        } finally {
            handleClose();
        }
    }

    const createDescriptionsList = (defaultHelper, item) => {
        return defaultHelper.map(step => step.reduce((ac, inp) => {
            return [
                ...ac,
                <React.Fragment key={'dt' + inp.name}>
                    <dt>
                        {inp.label || inp.placeholder}
                    </dt>
                    <dd>
                        {inp.componentName === 'MySelect' ? item[inp.name].name || item[inp.name] : item[inp.name]}
                    </dd>
                    <br />
                </React.Fragment>
            ]
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
            return (
                <>
                    <S.ModalHeader>
                        <h3>Pesquisar livro</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={inputMapToSearch} submmitButtonText="Pesquisar" onSubmit={searchBookSubmit} />
                </>
            )
        case 'updateBook':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Editar livro</h3>
                    </S.ModalHeader>
                    <CustomForm
                        inputMap={inputMap}
                        item={{ ...itemSelected, category: itemSelected.category.id, pricingGroup: itemSelected.pricingGroup.id }}
                        onSubmit={updateBookSubmit}
                    />
                </>
            )
        case 'inactiveBook':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Inativar livro</h3>
                        <h4>Item - {itemSelected.title}</h4>     
                    </S.ModalHeader>
                    <CustomForm s="min-height: 20vh;" inputMap={inputMapToInativation} submmitButtonText="Inativar"  item={itemSelected} onSubmit={inactiveBookSubmit} />                
                </>
            )
        case 'activeBook':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Ativar livro</h3>
                        <h4>Item - {itemSelected.title}</h4>     
                    </S.ModalHeader>
                    <CustomForm s="min-height: 20vh;" inputMap={inputMapToAtivation} submmitButtonText="Ativar"  item={itemSelected} onSubmit={activeBookSubmit} />                
                </>
            )
        case 'aboutBook':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                        <MyButton onClick={() => setShowModal('updateBook')}>Editar</MyButton>
                        {itemSelected.active ? (
                            <MyButton onClick={() => setShowModal('inactiveBook')}>Inativar</MyButton>
                        ) : (
                            <MyButton onClick={() => setShowModal('activeBook')}>Ativar</MyButton>
                        )}
                    </S.ModalHeader>
                    <S.WrapperDescriptionList>{createDescriptionsList([...inputMapToShowStatus, ...inputMap], itemSelected)}</S.WrapperDescriptionList>
                </>
            )
        default:
            return null
    }
}