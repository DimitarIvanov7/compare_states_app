import React from 'react';
import {FaEnvelope, FaPhoneAlt} from "react-icons/fa";
import './contact.css'

function Contact({handleMail}) {

  return (
    <div className="contact-container">
        <div className="left">
            <h1 className="contact-h1">Contact Dimitar</h1>
            <div className="contact-info-left">
                <div className="small-contact-cont">
                    <FaEnvelope size={20} className="contact-icons"/>
                    <p className="contact-p">dimiturivanov92@gmail.com</p>
                </div>
                <div className="small-contact-cont">
                    <FaPhoneAlt size={20} className="contact-icons"/>
                    <p className="contact-p">+359 887 917 209</p>
                </div>

            </div>

        </div>

        <div className="right">
                <h1 className="contact-h1">Contact Me</h1>
                <form className="contact-form" onSubmit={handleMail}>
                    <input type="text" className="contact-input" name="name" placeholder="name" required/>
                    
                    <input type="text" className="contact-input" name="email" placeholder="email" required/>

                    <textarea name="message" id="message" name="message" cols="30" rows="10" placeholder="message" required></textarea>

                    <button className="contact-btn" type="submit">Send</button>
                </form>

        </div>

    </div>
    
    );

}

export default Contact;
