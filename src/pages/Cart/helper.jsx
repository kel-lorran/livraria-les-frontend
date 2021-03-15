const quantityFormatter = row => (
    <>
        <i className="fas fa-minus" onClick={() => row.quantityControl(-1, row.id)}></i>
        <span>{row.quantity}</span>
        <i className="fas fa-plus" onClick={() => row.quantityControl(1, row.id)}></i>
    </>
);

export const tableOptions = {
    showElements: [
        {
            title: 'Livro',
            key: 'title',
            columnWidth: 28
        },
        {
            title: 'Preco',
            key: 'price'
        },
        {
            title: 'Quantidade',
            key: 'quantity',
            columnWidth: 8,
            formatter: quantityFormatter
        }
    ],
}