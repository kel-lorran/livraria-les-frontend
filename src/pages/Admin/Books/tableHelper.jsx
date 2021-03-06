import MyTable from '../../../components/MyTable';

import { tableOptions } from './helper';

export const TableHelper = ({ data, selectItem, type }) => {
    switch (type) {
        case 'activeBooks':
            return <MyTable data={data} onClick={selectItem} {...tableOptions} sideLabel={'Ativos'} maxHeight="250px" />
        case 'inactiveBooks':
            return <MyTable data={data} onClick={selectItem} {...tableOptions} sideLabel={'Inativos'} maxHeight="150px" />
        default:
            return null
    }
}