import MyTable from '../../../components/MyTable';

import { tableOptions, tableOptionsAddress } from './helper';

export const TableHelper = ({ data, selectItem, type }) => {
    switch (type) {
        case 'activeCustomers':
            return <MyTable data={data} onClick={selectItem} {...tableOptions} sideLabel={'Ativos'} maxHeight="250px" />
        case 'inactiveCustomers':
            return <MyTable data={data} onClick={selectItem} {...tableOptions} sideLabel={'Inativos'} maxHeight="150px" />
        case 'activeAddress':
            return <MyTable data={data} onClick={selectItem} {...tableOptionsAddress} maxHeight="150px" />
        default:
            return null
    }
}