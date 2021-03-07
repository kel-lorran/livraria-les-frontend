import React, { useState, useMemo } from 'react';
import axios from 'axios';
import MyInput from '../MyInput';
import MySelect from '../MySelect';
import MyButton from '../MyButton';

import * as S from './style';

// model
// {
//     "id": 0,
//     "name": {
//         "first": "string",
//         "last": "string"
//     },
//     "gender": "string",
//     "bhirthDate": "string",
//     "phone": {},
//     "cell": {},
//     "email": {
//         "address": "string"
//     },
//     "password": {
//         "value": "string"
//     }
// }

const PersonDataForm = ({ personDataObj, updatePersonDataObj }) => {
    const [name, setName] = useState(personDataObj.name);
    const [gender, setGender] = useState(personDataObj.gender);
    const [bhirthDate, setBhirthDate] = useState(personDataObj.bhirthDate);
    const [phone, setPhone] = useState(personDataObj.phone);
    const [cell, setCell] = useState(personDataObj.cell);
    const [email, setEmail] = useState(personDataObj.email);

    const handleSubmit = async e => {
        e.preventDefault();
        const { id } = personDataObj;
        const dataToSend = {
            id,
            name,
            gender,
            bhirthDate,
            phone: phone.number,
            cell: cell.number,
            email
        }
        try {
            debugger
            const updatedCustomer = await axios.put(`https://localhost:5001/v1/customer/${id}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.data?.data || {});

            updatePersonDataObj({
                ...personDataObj,
                name,
                gender,
                bhirthDate,
                phone,
                cell,
                email,
                ...updatedCustomer
            });

            window.alert('Sucesso!');
        } catch(error) {
            console.log(error);
            window.alert('Falha!');
        }
    }

    return (
        <S.CustomForm onSubmit={handleSubmit}>
            <div>
                <MyInput handleChange={(e) => setName({ ...name, first: e.target.value })} value={name.first} name="lastName" label="nome" required />
                <MyInput handleChange={(e) => setName({ ...name, last: e.target.value })} value={name.first} name="lastName" label="último nome" required />
                <MySelect handleChange={(e) => setGender(e.target.value)} value={gender} name="gender" placeholder="gerenero" required>
                    <>
                        <span data-value="M">Masculino</span>
                        <span data-value="F">Feminino</span>
                        <span data-value="U">Indefinido</span>
                    </>
                </MySelect>
                <MyInput handleChange={(e) => setBhirthDate(e.target.value)} value={bhirthDate} name="bhirthDate" label="data nascimento" required />
                <MyInput handleChange={(e) => setEmail({ ...email, address: e.target.value })} value={email.address} name="addressEmail" label="email" type="email" required />
                <MyInput handleChange={(e) => setCell({ ...cell, number: e.target.value })} value={cell.number} name="numberCell" label="celular" required />
                <MyInput handleChange={(e) => setPhone({ ...phone, number: e.target.value })} value={phone.number} name="numberPhone" label="telefone" required />
                <MyButton type="submit">
                    Atualizar
                </MyButton>
            </div>
        </S.CustomForm>
    )
}

export default PersonDataForm;
