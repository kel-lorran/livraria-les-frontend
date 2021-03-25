import { abbreviateText } from '../../../utils';

const dateFormatter = row => (new Date(row.date)).toLocaleDateString('pt-BR')

const merchandiseFormatter = row => {
    return row.merchandise.map(m => <div key={`merchan_${m.id}`}>{abbreviateText(m.book.title, 30)}</div>)
}

const addressFormatter = row => {
    return row.address.map(a => (
        <div key={`addr_${a.id}`}>
            {`${a.publicPlaceType} ${abbreviateText(a.publicPlaceName, 12)}, ${a.city}-${a.state}`}
        </div>)
    )
}

export const defaultTableOptions = {
    showElements: [
        {
            title: 'produtos',
            key: 'merchandise',
            formatter: merchandiseFormatter
        },
        {
            title: 'endereços',
            key: 'address',
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
            label:  'Novo status',
            required: true,
            options: [
                { value: 'inicial', text: 'Compra em análise'},
                { value: 'aprovada', text: 'Compra aprovada'},
                { value: 'recusada', text: 'Compra recusada'}
            ]
        },
    ]
]
