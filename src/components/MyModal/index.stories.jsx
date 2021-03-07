import { action } from '@storybook/addon-actions';
import MyModal from ".";

const containerStyle = {
    maxWidth: '1100px',
    margin: '20px auto'
}

export default {
    title: 'components/MyModal',
    component: MyModal
}

export const defaultRender = () => (
    <div style={containerStyle}>
        <MyModal handleClose={action('handleClose called')} show>
            <div>Eu sou um simples conteúdo</div>
        </MyModal>
    </div>
);
