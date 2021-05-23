import { useState } from 'react';
import * as S from './style';

export default ({ data, showElements, maxHeight, sideLabel, onClick, multipleSelect = 1 }) => {
    const [rowPositionSelected, setRowPositionSelected] = useState([]);
    const titles = []
    const keys = []
    const columnWidths = []
    const formatters = {}

    showElements.forEach((e, i) => {
        titles.push(e.title);
        keys.push(e.key);
        e.columnWidth && columnWidths.push([i + 1, e.columnWidth + 'ch'])
        e.formatter && (formatters[e.key] = e.formatter)
    });

    const manageRowSelecteds = rowPosition => {
        const newSet = new Set(rowPositionSelected);
        if(newSet.delete(rowPosition)) return setRowPositionSelected([...newSet])
        if(rowPositionSelected.size === multipleSelect) {
            const [, ...rest] = rowPositionSelected
            setRowPositionSelected([...rest, rowPosition])
        } else {
            setRowPositionSelected([...rowPositionSelected, rowPosition])
        }
    }

    return (
        <S.Wrapper columnWidths={columnWidths} maxHeight={maxHeight} rowSelected={rowPositionSelected}>
            {sideLabel && <div className="side-label">
                <span>{sideLabel}</span>
            </div>}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {
                                titles.map(v => <th key={v}>{v}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((r, i) => <tr onClick={() => {
                                if (onClick) {
                                    onClick(r, i);
                                    manageRowSelecteds(i + 1);
                                }
                            }} key={`tr_${r.id}`} key={`tr_${r.id}`}>
                                {keys.map(k => <td key={k}>{formatters[k] ? formatters[k](r, k) : r[k]}</td>)}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            
        </S.Wrapper>
    )
}