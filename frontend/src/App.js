import {BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import {GiHamburgerMenu} from "react-icons/gi";
// GiHamburgerMenu

import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';


function App() {

  const [toggleMenu, setToggleMenu] = useState(false)

  const [screenWidth, setscreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  }

  useEffect(() => {
    const changeWidth = () => {
      setscreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }

  }, [])

  function sendMail(e){
    e.preventDefault()

    const name = e.target[0].value
    const email = e.target[1].value
    const message = e.target[2].value

    console.log(`${name}   ${email}   ${message}`);

    fetch('http://localhost:5000/sendmail', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // this needs to be defined
        },
        body: JSON.stringify({ 
          name: name,
          email: email,
          message: message,
         })
      })

    alert("Message sent!")

    e.target.reset()
  }

  return (

    <div className="App">
      <BrowserRouter>
        <nav>
          <div className="logo-btn-cont">
            <Link to="/"><h1>Compare State</h1></Link>
            <button onClick={toggleNav} className="mobile-nav-btn"><GiHamburgerMenu size={27}/></button>
          </div>
          {(toggleMenu || screenWidth>640) && (
            <div className="link-container">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          )}
          
        </nav>
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About handleMail={sendMail}/>} />
            <Route path='/contact' element={<Contact handleMail={sendMail}/>} />
          </Routes>
        <Footer></Footer>
      
      </BrowserRouter>
    </div>

  );
}

export default App;
