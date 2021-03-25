export { inputMap } from '../Admin/Customers/helper';

export { TableHelper } from '../Admin/Customers/tableHelper';

export const inputMapCard = [
    [
        {
            componentName: 'MySelect',
            name: 'creditCardCompany',
            placeholder:  'empresa de cartão',
            required: true,
            options: [
                { value: 'visa', text: 'visa'},
                { value: 'mastercard', text: 'mastercard'},
                { value: 'elo', text: 'elo'}
            ]
        },
        {   
            componentName: 'MyInput',
            name: 'cardNumber',
            label:  'numero',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'validity',
            label:  'validade',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'label',
            label:  'rotulo',
            required: true
        }
    ]
]

export const tableOptionsCard = {
    showElements: [
        {
            title: 'Bandeira',
            key: 'creditCardCompany',
            columnWidth: 16
        },
        {
            title: 'Numero',
            key: 'cardNumber',
            columnWidth: 20
        },
        {
            title: 'Rotulo',
            key: 'label',
            columnWidth: 20
        }
    ],
}
