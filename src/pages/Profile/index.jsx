// import React, { useState } from 'react';
// import axios from 'axios';
// import { JsonToTable } from "react-json-to-table";
// import { Link } from 'react-router-dom';
// import MyHeader from '../../components/MyHeader';
// import PersonDataForm from '../../components/PersonDataForm';
// import MyButton from '../../components/MyButton';
// import MyModal from '../../components/MyModal';

// import * as S from './style';

// import { PROFILE_CUSTOMER_DATA } from '../../utils/data/constants';

// const Profile = ({ profile, updateProfile }) => {
//     const [formType, setFormType] = useState('profile')
//     const [showModal, setShowModal] = useState(false);

//     const formContent = {
//         personDataForm: <PersonDataForm personDataObj={profile} updatePersonDataObj={updateProfile} />,
//         profile: <JsonToTable json={JSON.stringify(profile)} />
//     }

//     const deleteProfile = async () => {
//         try {
//             await axios.delete(`https://localhost:5001/v1/customer/${profile.id}`);
//             window.alert('Sucesso na exclusão');
//             updateProfile(null);
//         } catch(error) {
//             console.log(error);
//             window.alert('Falha!');
//         }
//     }

//     return (
//         <S.PageWrapper>
//             <MyHeader />
//             {profile ? (
//                 <>
//                     <main>
//                         <S.Container>
//                             <S.SideBar>
//                                 <MyButton handleClick={() => setFormType('profile')}>
//                                     Perfil
//                                 </MyButton>
//                                 <MyButton handleClick={() => setFormType('personDataForm')}>
//                                     Editar Perfil
//                                 </MyButton>
//                                 <MyButton>
//                                     <Link to={'/signin/address'}>ADD Endereço</Link>
//                                 </MyButton>
//                                 <MyButton handleClick={() => setShowModal(true)}>
//                                     Excluir Conta
//                                 </MyButton>
//                             </S.SideBar>
//                             {formContent[formType]}
//                         </S.Container>
//                     </main>
//                     <MyModal show={showModal} handleClose={() => setShowModal(false)}>
//                         <h2>Deseja prosseguir com a exclusão?</h2>
//                         <MyButton handleClick={() => setShowModal(false)}>
//                             Cancelar
//                         </MyButton>
//                         <MyButton handleClick={deleteProfile}>
//                             Confirmar
//                         </MyButton>
//                     </MyModal>
//                 </>
//             ) : (
//                 <h1>Sem dados de perfil para gerenciar</h1>
//             )}
//         </S.PageWrapper>
//     );
// }

// export default Profile;
