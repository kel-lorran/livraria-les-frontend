import { useState } from 'react';
import { phoneMask } from '../../utils';
import MyInput from ".";

const containerStyle = {
    maxWidth: '448px',
    margin: '20px auto'
}

export default {
    title: 'components/MyInput',
    component: MyInput
}

export const defaultRender = () => (
    <div style={containerStyle}>
        <MyInput label="nome" required />
    </div>
);

export const halfSize = () => (
    <div style={containerStyle}>
        <MyInput label="nome" required halfSize />
    </div>
);

export const ControledComponent = () => {
    const [val, setVal] = useState("");
    return (
        <div style={containerStyle}>
            <MyInput value={val} handleChange={e => setVal(e.target.value)} label="nome" required halfSize />
        </div>
    );
}

export const WithMask = () => {
    const [val, setVal] = useState("");
    return (
        <div style={containerStyle}>
            <MyInput label="nome" handleChange={e => setVal(e.target.value)} value={val} mask={phoneMask} required />
        </div>
    );
}
