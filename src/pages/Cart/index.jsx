import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyHeader from '../../components/MyHeader';
import MyTable from '../../components/MyTable';
import MyButton from '../../components/MyButton';
import SimpleTextAsButton from '../../components/SimpleTextAsButton';
import Loader from '../../components/Loader';

import { tableOptions } from './helper';

import * as S from './style';
import { incrementStock } from '../../actions/merchandiseActions';

const buildData = (basket, controlfunction) => {
    const tempObj =  basket.reduce((ac, { item, quantity, id}) => {
        if(ac.id) {
            return ac[id].quantity += quantity
        }
        return {
            ...ac,
            [id]: {
                ...item,
                quantity,
                quantityControl: controlfunction
            }
        }
    }, {});
    return Object.values(tempObj);
}

const Login = ({ history, setBasket, basket }) => {
    const quantityControl = (increment, idBook) => null;
    const data = buildData(basket, quantityControl);

    return ( 
        <S.PageWrapper>
            <MyHeader authStatus="logged" />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <MyTable data={data} {...tableOptions} />
                    </S.Container>
                </S.SectionOne>
            </main>
        </S.PageWrapper>
    )
}

export default Login;
