export default ({ data }) => (
    <table>
        <thead>
            <tr>
                {
                    data.header.map(v => <th key={v}>{v}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.body.map(r => <tr key={r.id}>
                    {
                        r.map(v => <th key={v}>{v}</th>)
                    }
                </tr>)
            }
        </tbody>
    </table>
)