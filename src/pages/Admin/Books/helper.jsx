import { getAllCategories, getAllPriceGroups } from 'actions/constants';

const disableRequiredAttribute = helper => helper.map(step => step.map(e =>  ({ ...e, required: false })));

const buildOptionsCategory = async () => {
    const categories = await getAllCategories().then(r => r.data);
    return categories.map(({ name: text, id }) => (
        {
            value: id,
            text
        }
    ));
};

const buildOptionsPriceGroup = async () => {
    const pG = await getAllPriceGroups().then(r => r.data);
    return pG.map(({ name: text, id }) => (
        {
            value: id,
            text
        }
    ));
};


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
            options: [],
            getOptions: buildOptionsCategory
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
            name: 'isbn',
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
            label:  'peso(grama)',
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
            options: [],
            getOptions: buildOptionsPriceGroup
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
            name: 'inativationMessage',
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

export const inputMapToSearch = disableRequiredAttribute([
    [
        {
            componentName: 'MyInput',
            name: 'id',
            label:  'ID',
            type: 'number',
            halfSize: true
        },
        ...inputMap[0]
    ],
    inputMap[1]
]);

const abbreviateText = (len = 60) => (row, ...keys) => row[keys[0]].toString().replace(new RegExp(`(?<=.{${len}}).+`), '...');

const gpdFormatter = row => `GPD ${row.pricingGroup.name}`;

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