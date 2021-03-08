import MyTable from '../../../components/MyTable';

import { tableOptions } from './helper';

export const TableHelper = ({ data, selectItem, type }) => {
    switch (type) {
        case 'activeBooks':
            return <MyTable data={data} onClick={selectItem} {...tableOptions[type]} maxHeight="150px" />
        default:
            return null
    }
}