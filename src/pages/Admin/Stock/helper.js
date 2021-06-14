import { abbreviateText } from '../../../utils';

import { getAllBooks } from '../../../actions/bookActions';

const buildOptionsBook = async () => {
    const books = await getAllBooks().then(r => r.data);
    return books.map(({ isbn, title, id }) => {
        const text = `${title.replace(new RegExp(`(?<=.{12}).+`), '...')} - ISBN: ${isbn}`;
        return {
            value: id,
            text
        }
    })
}

const bookFormatter = ({ book: b}) => <div key={`book_${b.id}`}><span>{`Titulo: ${abbreviateText(b.title, 30)}`}</span><span style={{ float: 'right'}}>{`ISBN: ${b.isbn}`}</span></div>

export const inputMap = [
    [
        {   
            componentName: 'MyInput',
            name: 'price',
            type: 'number',
            min: 0,
            label:  'preço unitário de compra',
            step: '.01',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'priceSeller',
            type: 'number',
            min: 0,
            label:  'preço pretendido na venda',
            step: '.01',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'quantity',
            label:  'quantidade',
            min: 0,
            type: 'number',
            min: 1,
            required: true
        },
        {
            componentName: 'MySelect',
            name: 'bookId',
            placeholder:  'produto',
            required: true,
            options: [],
            getOptions: buildOptionsBook
        },
    ],
]

export const inputMapToDecrement = max => [
    [
        {
            ...inputMap[0][2],
            max
        }
    ]
]

export const tableOptions = {
    showElements: [
        {
            title: 'quantidade',
            key: 'quantity'
        },
        {
            title: 'preço(un/R$)',
            key: 'price'
        },
        {
            title: 'produtos',
            key: 'book',
            formatter: bookFormatter,
        }
    ]
}
 
