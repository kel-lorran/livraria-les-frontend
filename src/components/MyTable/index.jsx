import * as S from './style';

export default ({ data, showElements, maxHeight, sideLabel, onClick }) => {
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
        <S.Wrapper columnWidths={columnWidths} maxHeight={maxHeight}>
            <div className="side-label">
                <span>{sideLabel}</span>
            </div>
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
                            data.map(r => <tr onClick={() => onClick(r)} key={r.id}>
                                {keys.map(k => <td key={k}>{formatters[k] ? formatters[k](r) : r[k]}</td>)}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            
        </S.Wrapper>
    )
}