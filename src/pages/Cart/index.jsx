import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyHeader from '../../components/MyHeader';
import MyTable from '../../components/MyTable';
import MyButton from '../../components/MyButton';
import SimpleTextAsButton from '../../components/SimpleTextAsButton';
import Loader from '../../components/Loader';

import { tableOptions } from './helper';

import * as S from './style';

const Login = ({ history, setBasket, basket }) => {
    //const buildDatoToProductTable = (basket)
    
    return ( 
        <S.PageWrapper>
            <MyHeader authStatus="logged" />
            <main>
                <S.SectionOne>
                    <S.Container>
                        {/* <MyTable data={dataItems} onClick={selectItem} {...tableOptions} />  */}
                    </S.Container>
                </S.SectionOne>
            </main>
        </S.PageWrapper>
    )
}

export default Login;
