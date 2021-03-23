import InputMultiple from ".";

const containerStyle = {
    maxWidth: '448px',
    margin: '20px auto'
}

export default {
    title: 'components/InputMultiple',
    component: InputMultiple
}

export const defaultRender = () => (
    <div style={containerStyle}>
        <InputMultiple />
    </div>
);
