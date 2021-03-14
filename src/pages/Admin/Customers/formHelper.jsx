import React, { useState } from 'react';
import CustomForm from '../../../components/CustomForm';

import { saveNewCustomer, updateCustomer, searchCustomers } from '../../../actions/customerActions';
import { updateAddress, saveNewAddress, deleteAddress } from '../../../actions/addressActions';

import * as S from './style';
import { inputMap, inputMapToInativation, inputMapToAtivation, inputMapToShowStatus } from './helper';
import MyButton from '../../../components/MyButton';
import { Link } from 'react-router-dom';
import SimpleTextAsButton from '../../../components/SimpleTextAsButton';

export const FormHelper = ({ type, handleClose, itemSelected, setShowModal, setActiveCustomerList, setInactiveCustomerList, setResultIsFiltered }) => {
    const [stepCurrent, setStepCurrent] =  useState(1);
    const [dataToSend, setDataToSend] = useState();
    
    const createCustomerSubmit = async data => {
        if(dataToSend) {
            await saveNewCustomer({ ...dataToSend, active: 1}, [{...data, addressType: "cobranca", addressLabel: `${data.addressLabel} cobrança` }, {...data, addressType: "entrega", addressLabel: `${data.addressLabel} entrega` }] );
            handleClose(true);
            setStepCurrent(1);
        } else {
            setStepCurrent(2);
            setDataToSend({ ...data });
        }
    }

    const createAddressSubmit = async data => {
        await saveNewAddress(data, itemSelected.id)
        handleClose(true);
    }

    const updateCustomerWithoutAddressListSubmit = async data => {
        await updateCustomer({ ...itemSelected, ...data });
        handleClose(true);
    }

    const inactiveCustomerSubmit  = async data => {
        await updateCustomerWithoutAddressListSubmit({...data, active: 0});
    }

    const activeCustomerSubmit  = async data => {
        await updateCustomerWithoutAddressListSubmit({...data, active: 1});
    }

    const searchCustomerSubmit = async data => {
        try {
            const search = status => Object.entries(data).reduce((ac, [key, value], i) => {
                return value ? ac += `&${key}_like=${value}` : ac;
            },`?active=${status}`);

            const results = [searchCustomers(search(1)).then(r => r.data), searchCustomers(search(0)).then(r => r.data)];
            const [resultSearchActives, resultSearchInactives] = await Promise.all(results);

            setActiveCustomerList(resultSearchActives);
            setInactiveCustomerList(resultSearchInactives);

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
            return [...ac, <React.Fragment key={'dt' + inp.name}><dt>{inp.label || inp.placeholder}</dt><dd>{item[inp.name]}</dd></React.Fragment>]
        }, []))
    }

    const updateAddressSubmit = async data => {
        await updateAddress(data);
        handleClose(true);
    }

    const disableRequiredAttribute = helper => helper.map(step => step.map(e =>  ({ ...e, required: false })));

    const handleRemoveAddress = async addressId => {
        await deleteAddress(addressId);
        handleClose(true);
    }
    
    switch (type) {
        case 'createCustomer':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Novo cliente</h3>
                    </S.ModalHeader>
                    {stepCurrent === 1 ? (
                        <CustomForm key="1" inputMap={[inputMap[0]]} onSubmit={createCustomerSubmit} />
                    ) : (
                        <CustomForm key="2" inputMap={[inputMap[1]]} onSubmit={createCustomerSubmit} />
                    )}
                </>
            )
        case 'searchCustomer':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Pesquisar Cliente</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={[disableRequiredAttribute(inputMap)[0]]} submmitButtonText="Pesquisar" onSubmit={searchCustomerSubmit} />
                </>
            )
        case 'aboutCustomer':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                        <MyButton onClick={() => setShowModal('updateCustomer')}>Editar</MyButton>
                        <MyButton onClick={() => setShowModal('createAddress')}>+ Endreço</MyButton>
                        <MyButton onClick={() => setShowModal('removeAddress')}>- Endreço</MyButton>
                        {itemSelected.active ? (
                            <MyButton onClick={() => setShowModal('inactiveCustomer')}>Inativar</MyButton>
                        ) : (
                            <MyButton onClick={() => setShowModal('activeCustomer')}>Ativar</MyButton>
                        )}
                    </S.ModalHeader>
                    <S.WrapperDescriptionList>{createDescriptionsList([...inputMapToShowStatus, inputMap[0]], itemSelected)}</S.WrapperDescriptionList>
                    <Link to={`/admin/clientes/endereco?customerid=${itemSelected.id}`}>Lista de endereços</Link>
                </>
            )
        case 'updateCustomer':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Editar cliente - exceto endereço</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={[inputMap[0]]} item={itemSelected} onSubmit={updateCustomerWithoutAddressListSubmit} />
                </>
            )
        case 'inactiveCustomer':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Inativar Cliente</h3>
                        <h4>Cliente - {`${itemSelected.name} ${itemSelected.lastName}`}</h4>  
                    </S.ModalHeader>
                    <CustomForm s="min-height: 20vh;" inputMap={inputMapToInativation} submmitButtonText="Inativar"  item={itemSelected} onSubmit={inactiveCustomerSubmit} />                
                </>
            )
        case 'activeCustomer':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Ativar Cliente</h3>
                        <h4>Cliente - {`${itemSelected.name} ${itemSelected.lastName}`}</h4>
                    </S.ModalHeader>
                    <CustomForm s="min-height: 20vh;" inputMap={inputMapToAtivation} submmitButtonText="Ativar"  item={itemSelected} onSubmit={activeCustomerSubmit} />                
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
        case 'updateAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Editar endereço</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={[inputMap[1]]} item={itemSelected} onSubmit={updateAddressSubmit} />
                </>
            )
        case 'createAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Novo endereço - Cliente: {`${itemSelected.name} ${itemSelected.lastName}`}</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={[inputMap[1]]} onSubmit={createAddressSubmit} />
                </>
            )
        case 'removeAddress':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Remover endereço - Cliente: {`${itemSelected.name} ${itemSelected.lastName}`}</h3>
                    </S.ModalHeader>
                    <ul>
                        {itemSelected.address.map(a => <li key={a.addressLabel}><SimpleTextAsButton onClick={() => handleRemoveAddress(a.id)} fontSize="16px" >{`Excluir - ${a.addressLabel} - ${a.publicPlaceType} ${a.publicPlaceName}`}</SimpleTextAsButton></li>)}
                    </ul>
                    
                </>
            )
        default:
            return null
    }
}