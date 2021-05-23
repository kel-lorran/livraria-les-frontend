import { useState } from 'react';
import MyInputRadio from ".";

const containerStyle = {
    maxWidth: '448px',
    margin: '20px auto'
}

export default {
    title: 'components/MyInputRadio',
    component: MyInputRadio
}

const personTypeOptions = [
    {
        text: 'Fisica',
        value: 'cpf'
    },
    {
        text: 'Juridica',
        value: 'CNPJ'
    }
]

export const DefaultRender = () => {
    const [value, setValue] = useState();
    return(
        <div style={containerStyle}>
            <MyInputRadio label="tipo de pessoa" name="documentType" value={value} options={personTypeOptions} handleChange={({ target: {value } }) => setValue(value)} />
        </div>
    );
}
