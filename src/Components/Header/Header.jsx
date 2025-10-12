import React from 'react'
import ImageTitleTheSimpsons from '../../assets/ImageTitleTheSimpsons.png'
import Simpfamily from '../../assets/Simpfamily.webp'
import './Header.css'

const Header = () => {
  return (
    <header>
      <img src={Simpfamily} alt="Los Simpsons" id='image-family' />
      <img src={ImageTitleTheSimpsons} alt="Los Simpsons" id='image-title' />      
    </header>
  )
}

export default Header