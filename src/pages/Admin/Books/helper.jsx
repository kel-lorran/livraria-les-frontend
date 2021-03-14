export const inputMap = [
    [
        {   
            componentName: 'MyInput',
            name: 'author',
            label:  'autor',
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'title',
            label:  'titulo',
            required: true
        },
        {
            componentName: 'MySelect',
            name: 'category',
            placeholder:  'categoria',
            required: true,
            options: [
                { value: 'aventura', text: 'aventura'},
                { value: 'suspense', text: 'suspense'}
            ]
        },
        {
            componentName: 'MyInput',
            name: 'publishing',
            label:  'editora',
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'edition',
            label:  'edição',
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'ISBN',
            label:  'ISBN',
            type: 'number',
            max: 9999999999999,
            required: true
        },
    ],
    [
        {
            componentName: 'MyInput',
            name: 'year',
            label:  'ano',
            type: 'number',
            max: 9999,
            halfSize: true,
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'pageNumber',
            label:  'número de páginas',
            type: 'number',
            halfSize: true,
            required: true
        },
        {
            componentName: 'MyTextarea',
            name: 'synopsis',
            label:  'sinopse',
            minLength: 60,
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'height',
            label:  'altura(mm)',
            type: 'number',
            min: 1,
            halfSize: true,
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'width',
            label:  'largura(mm)',
            type: 'number',
            min: 1,
            halfSize: true,
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'weight',
            label:  'peso(kg)',
            type: 'text',
            halfSize: true,
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'length',
            label:  'comprimento(mm)',
            type: 'number',
            min: 1,
            halfSize: true,
            required: true
        },
        {
            componentName: 'MySelect',
            name: 'pricingGroup',
            placeholder:  'gpd - grupo de precificação',
            required: true,
            options: [
                { value: '1', text: 'padrão'},
                { value: '2', text: 'especial'}
            ]
        },
        {
            componentName: 'MyInput',
            name: 'codeBar',
            label:  'codigo de barras',
            type: 'number',
            max: 9999999999999,
            required: true
        },
    ]
]

export const inputMapToInativation = [
    [
        {   
            componentName: 'MyInput',
            name: 'reasonInativation',
            label:  'motivo da inativação',
            required: true
        },
    ]
]

export const inputMapToAtivation = [
    [
        {   
            componentName: 'MyInput',
            name: 'reasonAtivation',
            label:  'motivo da Ativação',
            required: true
        },
    ]
]

export const inputMapToShowStatus = [
    [
        {
            componentName: 'MySelect',
            name: 'active',
            placeholder:  'item ativo',
            required: true,
            options: [
                { value: '1', text: 'sim'},
                { value: '2', text: 'não'}
            ]
        },
    ]
]

const abbreviateText = (len = 60) => (row, ...keys) => row[keys[0]].toString().replace(new RegExp(`(?<=.{${len}}).+`), '...');

const gpdFormatter = row => `GPD ${row.pricingGroup}`;

const dimensionFormatter = row => `${row.length}x${row.width}x${row.height}`;

export const tableOptions = {
    showElements: [
        {
            title: 'Autor',
            key: 'author',
            columnWidth: 12
        },
        {
            title: 'Titulo',
            key: 'title',
            columnWidth: 14
        },
        {
            title: 'Ano',
            key: 'year',
        },
        {
            title: 'GDP',
            key: 'pricingGroup',
            formatter: gpdFormatter
        },
        {
            title: 'Dimensões',
            key: 'length',
            columnWidth: 12,
            formatter: dimensionFormatter
        },
        {
            title: 'Cd. barras',
            key: 'codeBar'
        }
    ],
    onRightEdge: <i className="fas fa-info-circle"></i>,
    onLeftEdge: <i class="far fa-square"></i>
}