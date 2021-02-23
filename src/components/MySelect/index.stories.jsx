import MySelect from ".";

const containerStyle = {
    maxWidth: '448px',
    margin: '20px auto'
}

export default {
    title: 'compoents/MySelect',
    component: MySelect
}

export const defaultRender = () => (
    <div style={containerStyle}>
        <MySelect label="nome">
            <>
                <span data-value="1">opção 1</span>
                <span data-value="2">opção 2</span>
                <span data-value="3">opção 3</span>
            </>
        </MySelect>
    </div>
);