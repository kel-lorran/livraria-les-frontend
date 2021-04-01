import { useState } from 'react';
import MySelect from ".";

const containerStyle = {
    maxWidth: '448px',
    margin: '20px auto'
}

export default {
    title: 'components/MySelect',
    component: MySelect
}

export const defaultRender = () => (
    <div style={containerStyle}>
        <MySelect placeholder="nome">
            <>
                <span data-value="1">opção 1</span>
                <span data-value="2">opção 2</span>
                <span data-value="3">opção 3</span>
            </>
        </MySelect>
    </div>
);

export const fetchOptions = () => (
    <div style={containerStyle}>
        <MySelect placeholder="nome" children={async () => {
            await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            return <>
                <span data-value="1">opção 1</span>
                <span data-value="2">opção 2</span>
            </>
        }} />
    </div>
);

export const WithState = () => {
    const [state, setState] = useState(2);

    return (
        <MySelect value={state} handleChange={({ target: { value }}) => setState(value)} placeholder="nome">
            <>
                <span data-value="1">opção 1</span>
                <span data-value="2">opção 2</span>
                <span data-value="3">opção 3</span>
            </>
        </MySelect>
    )
}
