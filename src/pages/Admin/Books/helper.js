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
            type: 'number',
            min: 1,
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