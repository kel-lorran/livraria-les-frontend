import { getAllBooksActives } from '../../../actions/bookActions'

const buildOptionsBook = async () => {
    const books = await getAllBooksActives().then(r => r.data);
    return books.map(({ ISBN, title, id }) => {
        const text = `${title.replace(new RegExp(`(?<=.{12}).+`), '...')} - ISBN: ${ISBN}`;
        return {
            value: id,
            text
        }
    })
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
    ]
]
