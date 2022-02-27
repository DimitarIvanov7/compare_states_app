import React from 'react';

function AddJob({newJob, jobInputRef}) {
  return (
    <form onSubmit={newJob}>
        <input ref={jobInputRef} className="add-job-input" type="text" name="job" placeholder="Add Job" required />
        <button type="submit" className="add-new-job">Save Job</button>
    </form>);
}

export default AddJob;
