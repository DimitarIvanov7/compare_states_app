import { useMemo } from 'react'
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./columns";
import { useState, useRef, useEffect } from 'react'
import Table from './Table';

 
function TableInfo({jobState}) { 

    const [loadingData, setLoadingData] = useState(true);

    const [tableState, setTable] = useState([])

    // console.log(tableState);


    useEffect(() => {
        fetch(`/${jobState}`)
            .then((response) => {
                if(response === "Max data exceeded") {
                    alert("Max data for today exceeded")
                    return null
                }
                return response.json()
            })
            .then(data => {
                if(data == null) {
                    return
                }
                else {
                    { setTable(data)}
                }
                
            })
    
    },[jobState])
    

    const columns = useMemo(() => COLUMNS,[])

    return (
        
        <div className="table-container">
            {tableState.length === 51 && <Table getData={tableState} columns={columns}/>}
        </div>
    )
}


export default TableInfo;
