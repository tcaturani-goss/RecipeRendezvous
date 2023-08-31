import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
        <div className='footer-main-container'>
          <div className='footer-link-container'>
            <a href='#' className='footer-link'>About Us</a>
            <a href='#' className='footer-link'>Terms & Conditions</a>
            <a href='#' className='footer-link'>Privacy & Cookie Policies</a>
          </div>
          <p className='copy-right-text'>2023 &copy;RecipeRendezvous</p>
        </div>
    </div>
  )
}

export default Footer