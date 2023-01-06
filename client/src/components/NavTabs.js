import React from 'react';
import {AiFillHome, AiFillProject} from 'react-icons/ai'
import {IoIosContact} from 'react-icons/io'
import {MdEmail} from 'react-icons/md'


function NavTabs({ currentPage, handlePageChange }) {
  return (
    <ul className="nav nav-tabs">
        <li><h1 className='headline'>Alastair Lee</h1></li>
        <li className="nav-item">
        <a
          href="#home"

          onClick={() => handlePageChange('Home')}
          className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
        >
          <AiFillHome className = 'home'/>
        </a>
        </li>
      
        <li className="nav-item">
            <a
            href="#projects"
            onClick={() => handlePageChange('Projects')}

            className={currentPage === 'Projects' ? 'nav-link active' : 'nav-link'}
            >
            <AiFillProject className = 'proj'/>
            </a>
        </li>

        <li className="nav-item">
            <a
            href="#about"
            onClick={() => handlePageChange('About')}

            className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
            >
            <IoIosContact className = 'abt'/>
            </a>
        </li>
        <li className="nav-item">
            <a
            href="#contact"

            onClick={() => handlePageChange('Contact')}
            className={currentPage === 'Contact' ? 'nav-link active' : 'nav-link'}
            >
            <MdEmail className='cont'/>
            </a>
        </li>

    </ul>
  );
}

export default NavTabs;
