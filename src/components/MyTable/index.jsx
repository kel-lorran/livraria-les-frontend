import { useState } from 'react';
import * as S from './style';

export default ({ data, showElements, maxHeight, sideLabel, onClick = () => null }) => {
    const [rowIndexSelected, setRowIndexSelected] = useState();
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

    return (
        <S.Wrapper columnWidths={columnWidths} maxHeight={maxHeight} rowSelected={rowIndexSelected}>
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
                                onClick(r, i);
                                setRowIndexSelected(i + 1);
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