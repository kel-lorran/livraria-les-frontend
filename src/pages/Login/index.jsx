import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyHeader from '../../components/MyHeader';
import MyButton from '../../components/MyButton';
import Loader from '../../components/Loader';

import * as S from './style';

import { login } from '../../actions/userActions';
import MyInput from '../../components/MyInput';
import SimpleTextAsButton from '../../components/SimpleTextAsButton';

import { searchAsObject } from '../../utils';

const Login = ({ location: { search }, updateProfile, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { redirectUrl } = searchAsObject(search);

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const result = await login({ email, password }).then(r => r.data);

            if(result.token) {
                updateProfile({ status: !!result.token, email, token: result.token });
                // window.alert('Sucesso na autenticação')
    
                history.replace(redirectUrl || '/');
            }
        } catch (error) {
            window.alert('Falha na autenticação, verifique o preenchimento e tente novamente.')
        }
    }

    return ( 
        <S.PageWrapper>
            <MyHeader authStatus="logging" />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <S.LoginForm onSubmit={handleSubmit}>
                            <div className="my-input-group">
                                <MyInput handleChange={(e) => setEmail(e.target.value)} value={email} name="email" type="email" label="email" required />
                                <MyInput handleChange={(e) => setPassword(e.target.value)} value={password} name="password" type="password" label="senha" required />
                            </div>
                            <SimpleTextAsButton className="recovery-password" fontSize="14px" textTransform="unset">Esqueci minha senha</SimpleTextAsButton>
                            <MyButton type="submit">Entrar</MyButton>
                            <p>Ainda não possui cadastro? <Link to="/signin">Cadastrar-se</Link></p>
                        </S.LoginForm>
                    </S.Container>
                </S.SectionOne>
            </main>
        </S.PageWrapper>
    )
}

export default Login;
