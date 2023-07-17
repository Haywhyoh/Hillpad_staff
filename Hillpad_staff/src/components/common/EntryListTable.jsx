import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


const EntryListTable = ({ listData, columns, emptyMessage, loading }) => {
    
    return (
        <>
            <div className="card mt-5 p-4">
                <DataTable value={listData} paginator rows={10} dataKey="id" loading={loading} emptyMessage={emptyMessage}
                    sortField="id" sortOrder={1} stripedRows size="small" tableStyle={{ minWidth: '50rem' }}>
                    {columns.map((column, index) => (
                        <Column key={index} field={column.field} header={column.label} sortable />
                    ))}
                </DataTable>
            </div>
        </>
    );
}
 
export default EntryListTable;