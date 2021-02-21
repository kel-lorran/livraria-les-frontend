import React, { useState, useMemo } from 'react';
import MyHeader from '../../components/MyHeader';
import MyInput from '../../components/MyInput';
import MySelect from '../../components/MySelect';
import MyTextarea from '../../components/MyTextarea';
import MyButton from '../../components/MyButton';
import MyModal from '../../components/MyModal';
import * as S from './style';

const Signin = ({ address }) => {
  const [addressForm, setAddressForm] = useState(!!address);

  const formContent = useMemo(() => {
    return addressForm ? (
      <div>
        <MySelect label="tipo residência" required>
          <>
            <span data-value="apartamento">apartamento</span>
            <span data-value="casa">casa</span>
            <span data-value="sitio">sitio</span>
          </>
        </MySelect>
        <MySelect label="tipo logradouro" required>
          <>
            <span data-value="rua">rua</span>
            <span data-value="avenida">avenida</span>
            <span data-value="beco">beco</span>
          </>
        </MySelect>
        <MyInput label="numero" type="number" required halfSize />
        <MyInput label="cep" type="number" required halfSize />
        <MyInput label="bairro" required />
        <MyInput label="cidade" required />
        <MySelect label="estado" required>
          <>
            <span data-value="sp">São Paulo</span>
            <span data-value="rj">Rio de Janeiro</span>
            <span data-value="mg">Minas Gerais</span>
          </>
        </MySelect>
        <MySelect label="pais" required>
          <>
            <span data-value="bra">Brasil</span>
            <span data-value="eua">Estados Unidos</span>
            <span data-value="arg">Argentina</span>
          </>
        </MySelect>
        <MyTextarea label="complemento" rows="2" />
        <div>
          <MyInput label="rotulo" required />
          <p className="field-description">
            como deseja nomear esse Endereço para referencia-lo no futuro
          </p>
        </div>
        <MyButton type="submit">
          Cadastrar
        </MyButton>
      </div>
    ) : (
      <div>
        <MyInput label="nome" required />
        <MyInput label="último nome" required />
        <MyInput label="data nascimento" required />
        <MyInput label="cpf" required />
        <MyInput label="email" type="email" required />
        <MyInput label="celular" required />
        <MyInput label="telefone" required />
        <MyInput label="senha" type="password" required />
        <MyInput label="confirmar senha" type="password" required />
        <MyButton type="submit">
          Continuar
        </MyButton>
      </div>
    )
  }, [addressForm]);

  return (
    <S.PageWrapper>
      <MyHeader />
      <main>
          <S.Container>
              <S.CustomForm>
                {formContent}
              </S.CustomForm>
          </S.Container>
      </main>
      <MyModal show>
        <S.ModalContent>
          <h3>Gerenciar endereços</h3>
          <div className="row-input">
            <p>endereço de cobrança:</p>
            <MySelect placeholder="escolha um endereço" required halfSize>
              <>
                <span data-value="1">endereço principal</span>
              </>
            </MySelect>
          </div>
          <div className="row-input">
            <p>endereço de entrega:</p>
            <MySelect placeholder="escolha um endereço" required halfSize>
              <>
                <span data-value="1">endereço principal</span>
              </>
            </MySelect>
          </div>
          <p>
            não econtrou o endereço desejado na lista? <a href="#">cadastrar novo endereço</a>
          </p>
          <MyButton type="submit">
            Finalizar
          </MyButton>
        </S.ModalContent>
      </MyModal>
    </S.PageWrapper>  
  );
}

export default Signin;
