import { useMemo } from 'react'
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./columns";
import { useState, useRef, useEffect } from 'react'
import './table.css'

import { AiOutlineQuestionCircle } from "react-icons/ai";



const Table = ({columns, getData}) => {

    // console.log(getData);

    // const data = useMemo(() => getData,[])
    
    const data = getData
    console.log(data);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    },
    useSortBy)

  return (
      <>
            <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? '🔻' : '🔺') : ''}
                                    </span>
                                    <span className="question-info">
                                        {column.tipText && <AiOutlineQuestionCircle/>}
                                    </span>
                                    <span className="more-info">
                                        {column.tipText}
                                    </span>
                            </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        {
                            footerGroups.map(footerGroup => (
                                <tr {...footerGroup.getFooterGroupProps()}>
                                    {
                                        footerGroup.headers.map(column => (
                                            <td {...column.getFooterGroupProps}>
                                                {
                                                    column.render('Footer')
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tfoot>
                    
                    
            </table>

        </>
  )
};

export default Table;
