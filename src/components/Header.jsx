import React from 'react'
import Logo from '../Logo'
import AccountCircle from './AccountCircle';

const Header = () => {
  return (
    <div className='header'>
        {/* <img src='public\keyboard-svgrepo-com.svg'/> */}
        <Logo/>
        <span>
            <AccountCircle/>
        </span>
    </div>
  )
}

export default Header