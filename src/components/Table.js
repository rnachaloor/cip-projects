import { useTable } from "react-table";
import cip_data from "../data/cip_projects.json";
import { COL } from "../data/columns";
import { useMemo, useEffect } from "react";
import './styles/Table_Styles.css';

/**
 * Creates a table based on CIP data
 * @returns Table Component
 */
const Table = () => {

    //stores data for columns and cip info
    const columns = useMemo(() => COL, []);
    const data = useMemo(() => cip_data.features, [])

    //react hook to create table
    const createTable = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps, rows, prepareRow } = createTable;
    
    //resizes table based on screen size (responsive)
    function resize() {
        if (window.innerWidth >= 900) {
            return 900;
        }
        return window.innerWidth
    }
    useEffect(() => {
        window.addEventListener('resize', resize)
    })
    
    return (
        <div className="tableWrap" style={{width: resize()}}>
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Project Title</th>
                        <th>Program Name</th>
                        <th>PM Name</th>
                        <th>PM Email</th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;