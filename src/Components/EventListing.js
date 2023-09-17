import React from 'react'

import './event.css'
const EventListing = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        <a className="navbar-brand" href="/">
          <h2 className="logo" width="100" height="90" > Internee.Com </h2>
        </a>
    
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link green" href="#EventListing">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link green" href="registraionform">RegistrationForm</a>
            </li>
            <li className="nav-item">
              <a className="nav-link green" href="#Details">Event Details</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default EventListing;