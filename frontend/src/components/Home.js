import { useState, useRef, useEffect } from 'react'
import axios from "axios"
import Header from './Header'
import TableInfo from './TableInfo'
import LoadingAnim from './LoadingAnim';
import HomeArrows from './HomeArrows';
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom'


function Home() {

    //input job
    const [jobState, setJob] = useState([null])
  
    //select job
    const [home, setHome] = useState([])
  
    //adding toggle
    const [adding, setAdd] = useState(false)
  
    //set loading
    const [loading, setLoading] = useState(false)
  
    // console.log(jobState);
  
    const selectJobRef = useRef()
  
    useEffect(() => {
      getDataAxios()
  
    },[])
  
    async function getDataAxios() {

      const jsonRes = await fetch("/get-data")
        
      const data = await jsonRes.json()

      // console.log(data);
      
  
      setHome(data)
    }
  
  
    async function postJob(e){
      e.preventDefault()
      const job = selectJobRef.current.value
  
      //change loading state
      setLoading(true)
  
      fetch('/get-data', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // this needs to be defined
        },
        body: JSON.stringify({ job: job })
      })
  
      .then(response => {
        return response.text()
        
      })
  
      .then(async data => {      
        if(data === "Max data for today exceeded" || data === "job already exists!" ){
          alert(data)
          setLoading(false)
          selectJobRef.current.value = null
          return
        }

        else {
          const awaitCheckRes = async () => {
            let intr = setInterval(async function() {
              const awaitReq = await fetch(`/ready/${job}`)
              const finalData = await awaitReq.json()
              // console.log(finalData.data);
              // console.log(finalData.body.data);
              if(finalData.data){
                clearInterval(intr)
                alert("Added Successfully!")
                setHome(prevHome => {
                  return [{Name: job}, ...prevHome]
                })
                setJob(job)
      
                //change loading state
                
                setLoading(false)
                selectJobRef.current.value = null
              }

            }, 2000)

          }
          await awaitCheckRes()
            
        }
      })
    }
  
    function deleteJob() {
      
      // console.log(jobState);
      
      if(confirmDelete()){
        // console.log(jobState);

        fetch(`/${jobState}`,{
          method:'DELETE'
        })
          .then(response => response.text())
          .then(data => {
            alert(data)
            setHome(home.filter((job) => job.Name !==jobState))
            setJob(home[0].Name)
          })
      }
    }

    function confirmDelete() {
      return window.confirm("Are you sure you want to delete this?")
    }
  
    function handleAdding() {
      setAdd(!adding)
    }
  
    return (
        <div className="container">
          <h1>Find the Best State to Start a Small Business</h1>
          <Header jobs={home} deleteJob={deleteJob} newJob={postJob} jobInputRef={selectJobRef} jobStateCur={jobState} setJob={setJob} addingHangle={adding} setAdding={handleAdding} />
          
          {jobState && !loading ? <TableInfo jobState={jobState}/> : <LoadingAnim />}
          {jobState[0] == null && !loading ? <HomeArrows /> : ""}
        </div>
    );
  }
  
export default Home;
