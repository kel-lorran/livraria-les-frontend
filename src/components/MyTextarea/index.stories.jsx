import MyTextarea from ".";

const containerStyle = {
    maxWidth: '448px',
    margin: '20px auto'
}

export default {
    title: 'components/MyTextarea',
    component: MyTextarea
}

export const defaultRender = () => (
    <div style={containerStyle}>
        <MyTextarea label="nome" required />
    </div>
);

export const halfSize = () => (
    <div style={containerStyle}>
        <MyTextarea label="nome" required halfSize />
    </div>
);
