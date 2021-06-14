import stateList from '../../../utils/data/estadosBrasileiros';
import { inputMap } from 'pages/shared/customers/helper';
import { disableRequiredAttribute, alterInputAndAttributes } from 'pages/shared/helper';
export * from 'pages/shared/customers/helper';

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
        ...alterInputAndAttributes(inputMap[0], ['password', 'passwordRedundancy'])
    ]
]);

export const tableOptions = {
    showElements: [
        {
            title: 'Sobrenome',
            key: 'lastName',
            columnWidth: 10
        },
        {
            title: 'Nome',
            key: 'name',
            columnWidth: 10
        },
        {
            title: 'cpf',
            key: 'cpf',
        },
        {
            title: 'email',
            key: 'email',
            columnWidth: 20
        }
    ],
    onRightEdge: <i className="fas fa-info-circle"></i>,
    onLeftEdge: <i class="far fa-square"></i>
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
            title: 'cidade',
            key: 'city',
            columnWidth: 20
        },
        {
            title: 'cep',
            key: 'cep',
        },
    ],
    onRightEdge: <i className="fas fa-info-circle"></i>,
    onLeftEdge: <i class="far fa-square"></i>
}
