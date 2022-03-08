import express from 'express';
import { render } from 'ejs';

import dotenv from "dotenv"

dotenv.config()

import path from 'path'

const __dirname = path.resolve();

import mongoose from 'mongoose';

import morgan from 'morgan';

import JobsInfo from './models/data-mod.js'

const Job = JobsInfo.JobData

import getTrendsData from './dataScrapping/trendsData.js'

import cors from 'cors'

import bodyParser from 'body-parser'

import fs from 'fs'

import nodemailer from 'nodemailer'


const app = express();
const port = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:3000'
}));


mongoose.connect(process.env.MONGODB_URI,  {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(port))
    .catch((err)=> console.log(err))



// register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//heroku
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

//read json body
// app.use(express.json());


//send emails 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dimiturivanov92@gmail.com',
      pass: 'pass'
    }
  });


app.get('/get-data', async (req, res) =>{
    
    const gettingData = await getJobData()

    res.send(gettingData)

})




app.post('/get-data', async (req, res) => {

    //check date quota

    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let yyyy = today.getFullYear();

    let todaysDate = `${mm}/${dd}/${yyyy}`;

    const checkData = await Job.find({ 'Created': todaysDate })

    const getDate = checkData.length

    if(getDate > 1) {
        res.send("Max data for today exceeded")
        return
    }


    let keyword = req.body.job

    let fixedkeyword = keyword.toLowerCase().trim()

    console.log(fixedkeyword);

    const findJob = await Job.findOne({
        'Name':fixedkeyword,
    }) 

    if(findJob==null){

        const finalFix = replacePlus(fixedkeyword)

        // await getTrendsData(finalFix)

        res.send("Working...")
        await getTrendsData(finalFix)

    } else {

        res.send("job already exists!")
    }

})

//check if data ready
app.get('/ready/:job', async (req, res) => {
    const job = req.params.job.toLowerCase();

    const finalFix = replacePlus(job)

    const findJob = await Job.findOne({
        'Name':finalFix,
    })

    if(findJob !== null){
        res.send({"data": true})
    }
    else {res.send({"data": false})}
     


})



app.get('/:jobState', async (req, res) => {
    const job = req.params.jobState.toLowerCase();

    const finalFix = replacePlus(job)

    const findJob = await Job.findOne({
        'Name':finalFix,
    })

    if(findJob !== null){
        // console.log(findJob.Data);
        res.send(findJob.Data)
    }
})

app.delete('/:jobDel', async (req, res) => {
    const jobDelete = req.params.jobDel.toLowerCase();

    const finalFix = replacePlus(jobDelete);

    // console.log(finalFix);

    const jobsSearch = Job.find();

    jobsSearch.count(function (err, count) {
        if (err) console.log(err)
        else {
            if(count<6){
                res.send("You don't have a permission to delete")
            }
            else {
                Job.deleteOne({ Name: finalFix }, async function(err) {
                    if(err) console.log(err);
                    console.log("Successful deletion");
            
                    //not sure why this is here
                    // const gettingData = await getJobData()
                    res.send("Successfully deleted")
                });

            }
        }
    });
})

app.post('/sendmail', async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message

    const mailOptions = {
        from: "dimiturivanov92@gmail.com",
        to: 'dimiturivanov92@gmail.com',
        subject: 'Jobs App - contact from',
        text: `name: ${name}
        email: ${email}
        message: ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
    

async function getJobData() {
    const findJob = await Job.find()

    return JSON.stringify(findJob);

}


function replacePlus(keyword) {
    if(keyword.includes(" ")) {
        keyword = keyword.replaceAll(" ", "+")
    }

    return keyword
}






    


    
