// import React, { useState, useMemo } from 'react';
// import axios from 'axios';
// import MyHeader from '../../components/MyHeader';
// import MyInput from '../../components/MyInput';
// import MySelect from '../../components/MySelect';
// import MyTextarea from '../../components/MyTextarea';
// import MyButton from '../../components/MyButton';
// import MyModal from '../../components/MyModal';
// import * as S from './style';

// import brazilianStates from '../../utils/data/estadosBrasileiros';
// import MyInputRadio from '../../components/MyInputRadio';

// const personTypeOptions = [
//   {
//       text: 'Fisica',
//       value: 'CPF'
//   },
//   {
//       text: 'Juridica',
//       value: 'CNPJ'
//   }
// ]

// const Signin = () => {
//   const [managerAddressList, setManagerAddressList] = useState(false);

//   const [publicPlaceType, setPublicPlaceType] = useState();
//   const [publicPlaceName, setPublicPlaceName] = useState();
//   const [number, setNumber] = useState();
//   const [neighborhood, setNeighborhood] = useState();
//   const [cep, setCep] = useState();
//   const [city, setCity] = useState();
//   const [state, setState] = useState();
//   const [country, setCountry] = useState();
//   const [houseType, setHouseType] = useState();
//   const [complement, setComplement] = useState();
//   const [addressLabel, setAddressLabel] = useState();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const SIGNIN_FIRST_STEP_DATA = 'signinFirstStepData';

//     const jsonPersonDataToSend = window?.sessionStorage.getItem(SIGNIN_FIRST_STEP_DATA) || "{}";
    
//     const addressToSend = {
//       publicPlaceType,
//       publicPlaceName,
//       number,
//       neighborhood,
//       cep,
//       city,
//       state,
//       country,
//       houseType,
//       complement,
//       addressLabel
//     }

//     await axios.post(`https://localhost:5001/v1/customer`, {...JSON.parse(jsonPersonDataToSend),...addressToSend}, {
//       headers: {
//         'Content-Type': 'application/json'
//       } 
//     })
//   }
//   const formContent = useMemo(() => {
//     return addressForm ? (
//       <div>
        
//         <MySelect handleChange={(e) => setPublicPlaceType(e.target.value)} value={publicPlaceType} name="publicPlaceType" placeholder="tipo logradouro" required>
//           <>
//             <span data-value="rua">rua</span>
//             <span data-value="avenida">avenida</span>
//             <span data-value="beco">beco</span>
//           </>
//         </MySelect>
//         <MyInput handleChange={(e) => setPublicPlaceName(e.target.value)} name="publicPlaceName" value={publicPlaceName} label="numero" type="number" required halfSize />
//         <MyInput handleChange={(e) => setNumber(e.target.value)} name="number" value={number} label="numero" type="number" required halfSize />
//         <MyInput handleChange={(e) => setCep(e.target.value)} name="cep" value={cep} label="cep" type="number" required halfSize />
//         <MyInput handleChange={(e) => setNeighborhood(e.target.value)} name="neighborhood" value={neighborhood} label="bairro" required />
//         <MyInput handleChange={(e) => setCity(e.target.value)} name="city" value={city} label="cidade" required />
//         <MySelect handleChange={(e) => setState(e.target.value)} name="state" value={state} placeholder="estado" required>
//           {brazilianStates.map(({nome, sigla}) => <span key={sigla} data-value={sigla}>{nome}</span>)}
//         </MySelect>
//         <MySelect handleChange={(e) => setCountry(e.target.value)} name="country" value={country} placeholder="pais" required>
//           <>
//             <span data-value="bra">Brasil</span>
//             <span data-value="eua">Estados Unidos</span>
//             <span data-value="arg">Argentina</span>
//           </>
//         </MySelect>
//         <MySelect handleChange={(e) => setHouseType(e.target.value)} value={houseType} name="houseType" placeholder="tipo residência" required>
//           <>
//             <span data-value="apartamento">apartamento</span>
//             <span data-value="casa">casa</span>
//             <span data-value="sitio">sitio</span>
//           </>
//         </MySelect>
//         <MyTextarea handleChange={(e) => setComplement(e.target.value)} name="complement" value={complement}  label="complemento" rows="2" />
//         <div>
//           <MyInput handleChange={(e) => setAddressLabel(e.target.value)} name="addressLabel" value={addressLabel}  label="rotulo" required />
//           <p className="field-description">
//             como deseja nomear esse Endereço para referencia-lo no futuro
//           </p>
//         </div>
//         <MyButton type="submit">
//           Cadastrar
//         </MyButton>
//       </div>
//     ) : (
//       <div>
//         <MyInput handleChange={(e) => setName(e.target.value)} value={name} name="name" label="nome" required />
//         <MyInput handleChange={(e) => setLastName(e.target.value)} value={lastName} name="lastName" label="último nome" required />
//         <MySelect handleChange={(e) => setGender(e.target.value)} value={gender} name="gender" placeholder="gerenero" required>
//           <>
//             <span data-value="M">Masculino</span>
//             <span data-value="F">Feminino</span>
//             <span data-value="U">Indefinido</span>
//           </>
//         </MySelect>
//         <MyInput handleChange={(e) => setBhirthDate(e.target.value)} value={bhirthDate} name="bhirthDate" label="data nascimento" required />
//         <MyInputRadio label="tipo de pessoa" name="documentType" value={documentType} options={personTypeOptions} handleChange={({ target: {value } }) => setDocumentType(value)} />
//         {documentType === 'CPF' ? (
//           <MyInput handleChange={(e) => setDocumentCode(e.target.value)} value={documentCode} name="documentCode" label="cpf" required />
//         ) : (
//           <MyInput handleChange={(e) => setDocumentCode(e.target.value)} value={documentCode} name="documentCode" label="cnpf" required />
//         )}
//         <MyInput handleChange={(e) => setEmail(e.target.value)} value={email} name="email" label="email" type="email" required />
//         <MyInput handleChange={(e) => setCell(e.target.value)} value={cell} name="cell" label="celular" required />
//         <MyInput handleChange={(e) => setPhone(e.target.value)} value={phone} name="phone" label="telefone" required />
//         <MyInput handleChange={(e) => setPassword(e.target.value)} value={password} name="password" label="senha" type="password" required />
//         <MyInput handleChange={(e) => setPasswordCofirmation(e.target.value)} value={passwordCofirmation} name="passwordCofirmation" label="confirmar senha" type="password" required />
//         <MyButton type="submit">
//           Continuar
//         </MyButton>
//       </div>
//     )
//   }, [addressForm]);

//   return (
//     <S.PageWrapper>
//       <MyHeader />
//       <main>
//           <S.Container>
//               <S.CustomForm onSubmit={handleSubmit}>
//                 {formContent}
//               </S.CustomForm>
//           </S.Container>
//       </main>
//       <MyModal show={managerAddressList}>
//         <S.ModalContent>
//           <h3>Gerenciar endereços</h3>
//           <div className="row-input">
//             <p>endereço de cobrança:</p>
//             <MySelect placeholder="escolha um endereço" required halfSize>
//               <>
//                 <span data-value="1">endereço principal</span>
//               </>
//             </MySelect>
//           </div>
//           <div className="row-input">
//             <p>endereço de entrega:</p>
//             <MySelect placeholder="escolha um endereço" required halfSize>
//               <>
//                 <span data-value="1">endereço principal</span>
//               </>
//             </MySelect>
//           </div>
//           <p>
//             não econtrou o endereço desejado na lista? <a href="#">cadastrar novo endereço</a>
//           </p>
//           <MyButton type="submit">
//             Finalizar
//           </MyButton>
//         </S.ModalContent>
//       </MyModal>
//     </S.PageWrapper>  
//   );
// }

// export default Signin;
