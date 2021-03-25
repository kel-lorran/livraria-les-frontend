import MyTable from '../../../components/MyTable';

import { defaultTableOptions } from './helper';

export const TableHelper = ({ data, selectItem, type }) => {
    switch (type) {
        case 'defaultOrderTable':
            return <MyTable data={data} onClick={selectItem} {...defaultTableOptions} maxHeight="250px" />
        default:
            return null
    }
}