import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


const EntryListTable = ({ listData, columns }) => {
    
    return (
        <>
            <div className="card mt-5 p-4">
                <DataTable value={listData} sortField="id" sortOrder={1} stripedRows size="small" tableStyle={{ minWidth: '50rem' }}>
                    {columns.map((column, index) => (
                        <Column key={index} field={column.field} header={column.label} sortable />
                    ))}
                </DataTable>
            </div>
        </>
    );
}
 
export default EntryListTable;