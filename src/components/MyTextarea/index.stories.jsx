import MyInput from ".";

const containerStyle = {
    maxWidth: '448px',
    margin: '20px auto'
}

export default {
    title: 'compoents/MyInput',
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
