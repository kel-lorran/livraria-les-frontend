import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyHeader from '../../components/MyHeader';
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
            try {
                await saveNewCustomer({ ...dataToSend, ...data });
                try{
                    const { email, password } = dataToSend;
                    const result = await login({ email, password }).then(r => r.data);
        
                    if(result.token) {
                        updateProfile({ status: !!result.token, email, token: result.token });
                        window.alert('Sucesso na autenticação')
            
                        history.replace(redirectUrl || '/');
                    }
                } catch (error) {
                    window.alert('Falha na autenticação automática, tente manualmente')
                    history.replace('/login');
                }
            } catch (error) {
                window.alert('Falha na registro');
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
