import { abbreviateText } from '../../../utils';

import { getAllBooks } from '../../../actions/bookActions';

const buildOptionsBook = async () => {
    const books = await getAllBooks().then(r => r.data);
    return books.map(({ ISBN, title, id }) => {
        const text = `${title.replace(new RegExp(`(?<=.{12}).+`), '...')} - ISBN: ${ISBN}`;
        return {
            value: id,
            text
        }
    })
}

const bookFormatter = row => {
    return row.book.map(b => <div key={`book_${b.id}`}><span>{`Titulo: ${abbreviateText(b.title, 30)}`}</span><span style={{ float: 'right'}}>{`ISBN: ${b.ISBN}`}</span></div>)
}

export const inputMap = [
    [
        {   
            componentName: 'MyInput',
            name: 'price',
            label:  'preço unitário',
            required: true
        },
        {   
            componentName: 'MyInput',
            name: 'quantity',
            label:  'quantidade',
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
 
