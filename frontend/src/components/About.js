import React from 'react';
import './about.css'

function About({handleMail}) {
  return (
        <div className="about-container">
            <div className="left-side">
                <h1 className="about-h1">About the Project</h1>
                <h2 className="about-h2">Idea</h2>
                <p className="about-p">Users can add a job/business they are interested in. The program then gets information about the interest people have in this job/business for each state and compares it to the competition to help users find out the best state to start a business. Interest is determined by the data from Google Trends API for each state. <br></br><br></br>Competition is determined by the returned search results for the job + the state + 'near me'. For example there are 10,100,000 results for 'locksmith near me texas' (the app gets the data from Custom JSON search API). <br></br><br></br>Then the program divides that data by the state population (which it gets from census API) to determine the competition.<br></br> <br></br>After that it displays the information in a table. Users can sort the columns by clicking on the headers.</p>
                <h2 className="about-h2">Technology</h2>
                <ul>
                    <li>Front-End: <span> React.js</span></li>
                    <li>Back-End: <span> Nodejs/Express</span></li>
                    <li>Database: <span> MongoDB</span></li>
                </ul>
                <h2 className="about-h2">APIs used</h2>
                <ul>
                    <li>Google Trends API</li>
                    <li>Custom Search JSON API</li>
                    <li>Census API</li>
                </ul>
                <h2 className="about-h2">More info</h2>
                <p className="about-p final-p" >Since Custom Search JSON API is paid, I limited the amount of new jobs users can add per day.</p>
            </div>
            <div className="right-side">
            <h1 className="about-h1">Contact Me</h1>
                <form className="about-form" onSubmit={handleMail}>
                    <input type="text" className="about-input" name="name" placeholder="name" required/>
                    
                    <input type="text" className="about-input" name="email" placeholder="email" required/>

                    <textarea name="message" id="message" name="message" cols="30" rows="10" placeholder="message" required></textarea>

                    <button className="about-btn" type="submit">Send</button>
                </form>
            </div>
        </div>
        );
}

export default About;
