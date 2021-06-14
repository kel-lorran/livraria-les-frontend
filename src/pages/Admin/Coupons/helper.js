const dateFormatter = row => (new Date(row.date)).toLocaleDateString('pt-BR')

const valueFormatter = row => row.value < 1.001 ? (
    <span key={row.id}>{(+row.value * 100).toFixed()}%</span>
) : (
    <span key={row.id}>{row.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
);

export const defaultTableOptions = {
    showElements: [
        {
            title: 'value',
            key: 'value',
            formatter: valueFormatter
        },
        {
            title: 'status',
            key: 'status'
        },
        {
            title: 'Codigo',
            key: 'code'
        },
        {
            title: 'Data',
            key: 'date',
            formatter: dateFormatter
        },
    ]
}

export const inputMap = [
    [
        {   
            componentName: 'MyInput',
            name: 'value',
            label:  'valor',
            required: true,
            step: '.01',
            min: 0,
            halfSize: true
        },
        {   
            componentName: 'MyInput',
            name: 'date',
            label:  'validade',
            required: true,
            type: 'date',
            className: 'fill',
            min: (new Date()).toLocaleDateString('pt-BR').split('/').reverse().join('-'),
            halfSize: true
        },
        {   
            componentName: 'MySelect',
            name: 'type',
            placeholder:  'tipo',
            required: true,
            options: [
                { value: 'promotional', text: 'promocional'},
            ]
        }
    ]
]
