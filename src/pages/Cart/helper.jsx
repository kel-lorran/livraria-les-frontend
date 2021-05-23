const styleDisplayQuantity = {
    padding: '0 9px',
    fontSize: '16px',
    fontWeight: 'bold'
}

const quantityFormatter = row => (
    <>
        <i className="fas fa-minus" onClick={() => row.quantityControl(-1, row.id)}></i>
        <span style={styleDisplayQuantity}>{row.quantity}</span>
        <i className="fas fa-plus" onClick={() => row.quantityControl(1, row.id)}></i>
    </>
);

export const tableOptionsProducts = {
    showElements: [
        {
            title: 'Livro',
            key: 'title',
            columnWidth: 28
        },
        {
            title: 'Preco',
            key: 'price'
        },
        {
            title: 'Quantidade',
            key: 'quantity',
            columnWidth: 8,
            formatter: quantityFormatter
        }
    ],
}

export const tableOptionsAddress = {
    showElements: [
        {
            title: 'Logradouro',
            key: 'publicPlaceName',
            columnWidth: 20
        },
        {
            title: 'Numero',
            key: 'homeNumber',
            columnWidth: 6
        },
        {
            title: 'cep',
            key: 'cep',
        },
        {
            title: 'Rotulo',
            key: 'addressLabel',
        },
    ]
}

export const tableOptionsCard = {
    showElements: [
        {
            title: 'Bandeira',
            key: 'creditCardCompany',
            columnWidth: 10
        },
        {
            title: 'Numero',
            key: 'cardNumber',
        },
        {
            title: 'Rotulo',
            key: 'label',
            columnWidth: 20
        }
    ]
}
