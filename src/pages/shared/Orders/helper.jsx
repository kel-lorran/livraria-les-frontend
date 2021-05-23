import { abbreviateText } from '../../../utils';

const dateFormatter = row => (new Date(row.date)).toLocaleDateString('pt-BR')

const merchandiseFormatter = row => {
    return row.merchandiseList.map(m => <div key={`merchan_${m.id}`}>{abbreviateText(m.book.title, 30)}</div>);
}

const addressFormatter = row => {
    const { id, publicPlaceType, publicPlaceName, city, state } = row.deliveryAddress;
    return (
        <div key={`addr_${id}`}>
            {`${publicPlaceType} ${abbreviateText(publicPlaceName, 12)}, ${city}-${state}`}
        </div>
    )
}

export const defaultTableOptions = {
    showElements: [
        {
            title: 'produtos',
            key: 'merchandiseList',
            formatter: merchandiseFormatter
        },
        {
            title: 'endereços',
            key: 'deliveryAddress',
            formatter: addressFormatter
        },
        {
            title: 'Data',
            key: 'date',
            formatter: dateFormatter
        },
        {
            title: 'Status',
            key: 'status',
            columnWidth: 14
        }
    ]
}

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
            title: 'Tipo',
            key: 'addressType',
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

export const inputMapToUpdateStatus = [
    [
        {   
            componentName: 'MySelect',
            name: 'status',
            placeholder: 'Novo status',
            required: true,
            options: [
                { value: 'em processamento', text: 'Em processamento'},
                { value: 'aprovada', text: 'Compra Aprovada'},
                { value: 'recusada', text: 'Compra recusada'},
                { value: 'em transporte', text: 'Em transporte'},
                { value: 'entregue', text: 'Entregue'},
                { value: 'em troca', text: 'Em troca'},
                { value: 'troca recusada', text: 'Troca recusada'},
                { value: 'troca autorizada', text: 'Troca autorizada'},
                { value: 'mercadoria devolvida', text: 'Mercadoria devolvida'},
                { value: 'concluida', text: 'Pedido concluido'},
                { value: 'finalizada', text: 'Finalizado - garantia expirada'}
            ]
        },
    ]
]

export const inputMapToSearchOrder = [
    [
        {
            componentName: 'MyInput',
            name: 'id',
            required: false,
            type: 'number',
            max: 9999,
            label: 'ID do pedido'
        },
        {
            componentName: 'MyInput',
            name: 'date',
            required: false,
            label: 'data de criação'
        },
        { ...inputMapToUpdateStatus[0][0], required: false }
    ]
]
