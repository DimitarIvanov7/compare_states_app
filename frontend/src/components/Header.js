import AddJob from './AddJob';
import { useState, useRef, useEffect } from 'react'

import { BiTrash } from "react-icons/bi";




const Header = ({jobs, deleteJob, newJob, jobInputRef, jobStateCur, setJob, addingHangle, setAdding}) => {

    console.log(jobStateCur);

    return (
        <div className="header">
            <div className="select-delete-container">
                {/* <h1>{job}</h1> */}
                <select value={jobStateCur} onChange={e=>setJob(e.target.value)} name="select-job" id="select-job">
                    <option value="" disabled selected>Choose a job</option>
                    
                    {jobs.map(job=>{
                        if(job.Name.includes("+")){
                            job.Name = job.Name.replaceAll("+", " ")
                        }

                        return <option key={job.Name} value={job.Name}> {job.Name} </option>
                    })}
                </select>
                <BiTrash onClick={() => deleteJob()} className="delete-icon"/>
            </div>
            <button onClick={setAdding} className="open-adding">{addingHangle ? 'Close' : "Add New"}</button>
            
            {addingHangle && <AddJob newJob={newJob} jobInputRef={jobInputRef} />}

            
            
        </div>
    );
};

export default Header;