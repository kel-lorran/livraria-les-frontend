import stateList from '../../utils/data/estadosBrasileiros';

export const inputMap = [
    [
        {   
            componentName: 'MyInput',
            name: 'name',
            label:  'nome',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'lastName',
            label:  'sobrenome',
            required: true
        },
        {
            componentName: 'MySelect',
            name: 'gender',
            placeholder:  'gênero',
            required: true,
            options: [
                { value: 'f', text: 'feminino'},
                { value: 'm', text: 'masculino'},
                { value: 'u', text: 'indefinido'}
            ]
        },
        {   
            componentName: 'MyInput',
            name: 'CPF',
            label:  'cpf',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'birthDate',
            label:  'data nascimento',
            required: true,
            halfSize: true
        },
        {   
            componentName: 'MyInput',
            name: 'phone',
            label:  'telefone',
            required: true,
            halfSize: true
        },
        {   
            componentName: 'MyInput',
            name: 'email',
            label:  'email',
            type: 'email',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'password',
            label:  'senha',
            type: 'password',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'passwordRedundancy',
            label:  'repita a senha',
            type: 'password',
            required: true
        },
    ],
    [
        {
            componentName: 'MySelect',
            name: 'homeType',
            placeholder:  'tipo de residência',
            required: true,
            options: [
                { value: 'casa', text: 'casa'},
                { value: 'apartamento', text: 'apartamento'},
                { value: 'sitio', text: 'sitio'}
            ]
        }, 
        {
            componentName: 'MySelect',
            name: 'publicPlaceType',
            placeholder:  'tipo de logradouro',
            required: true,
            options: [
                { value: 'rua', text: 'rua'},
                { value: 'avenida', text: 'avenida'},
                { value: 'rodovia', text: 'rodovia'}
            ]
        },
        {
            componentName: 'MyInput',
            name: 'publicPlaceName',
            label:  'nome do logradouro',
            required: true
        },
        {
            componentName: 'MyInput',
            name: 'homeNumber',
            label:  'numero da residência',
            required: true,
            halfSize: true
        },
        {
            componentName: 'MyInput',
            name: 'CEP',
            label:  'cep',
            required: true,
            halfSize: true
        },
        {
            componentName: 'MyInput',
            name: 'neighborhood',
            label:  'bairro',
            required: true,
        },
        {
            componentName: 'MyInput',
            name: 'city',
            label:  'cidade',
            required: true,
        },
        {
            componentName: 'MySelect',
            name: 'state',
            placeholder:  'estado',
            required: true,
            options: stateList.map(({ nome: text, sigla: value}) => ({ text, value }))
        },
        {
            componentName: 'MySelect',
            name: 'country',
            placeholder:  'pais',
            required: true,
            options: [
                { value: 'bra', text: 'Brasil'},
                { value: 'usa', text: 'Estados Unidos da America'},
                { value: 'arg', text: 'Argentina'}
            ]
        },
        {
            componentName: 'MyTextarea',
            name: 'complement',
            label:  'complemento',
            minLength: 60
        },
        {
            componentName: 'MyInput',
            name: 'addressLabel',
            label:  'rotulo para esse endereço',
            required: true,
        }
    ]
]
