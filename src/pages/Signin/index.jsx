import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyHeader from '../../components/MyHeader';
import MyButton from '../../components/MyButton';
import Loader from '../../components/Loader';
import CustomForm from '../../components/CustomForm';

import * as S from './style';
import { inputMap } from './helper';
import { saveNewCustomer } from '../../actions/customerActions';
import { login } from '../../actions/userActions';

import { searchAsObject } from '../../utils';

const Signin = ({ location: { search }, updateProfile, history }) => {
    const [stepCurrent, setStepCurrent] =  useState(1);
    const [dataToSend, setDataToSend] = useState();
    const { redirectUrl } = searchAsObject(search);

    const createCustomerSubmit = async data => {
        if(dataToSend) {
            await await saveNewCustomer({ ...dataToSend, active: 1}, [data] );
            
            const isLogged = await login(dataToSend.email, dataToSend.password).then(r => !!r.data.length);
            updateProfile({ status: isLogged, email: dataToSend.email });

            if(isLogged) {
                window.alert('Sucesso na autenticação')

                history.replace(redirectUrl || '/');
            } else {
                window.alert('Falha na autenticação automática');
                history.replace('/login');
            }
        } else {
            setStepCurrent(2);
            setDataToSend({ ...data });
        }
    }

    return ( 
        <S.PageWrapper>
            <MyHeader />
            <main>
                <S.SectionOne>
                    <S.Container>
                        {stepCurrent === 1 ? (
                            <CustomForm key="1" inputMap={[inputMap[0]]} onSubmit={createCustomerSubmit} />
                        ) : (
                            <CustomForm key="2" inputMap={[inputMap[1]]} onSubmit={createCustomerSubmit} />
                        )}
                    </S.Container>
                </S.SectionOne>
            </main>
        </S.PageWrapper>
    )
}

export default Signin;
