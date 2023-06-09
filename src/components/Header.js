import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';
import logo from '../assets/images/shelf_logo2.png';


function Header() {
    return (

        <div className='navbar'>
            <div className='container'>
                <img src={logo} className="logo" alt="Shelf logo" />
                <ul className='nav-links'>
                    <li className='nav-item'>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                    <NavLink to="AddBook" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Add New Book</NavLink>
                    </li>
                    <li className='nav-item'>
                    <NavLink to="BooksOnLoan" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>On Loan</NavLink>
                    </li>
                </ul>

            </div>

        </div>



    );

}



export default Header