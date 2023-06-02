import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';

function Header() {
    return (

        <div className='navbar'>
            <div className='container'>
                <h3 className='logo'>Shelf</h3>
                <ul className='nav-links'>
                    <li className='nav-item'>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                    <NavLink to="BooksOnLoan" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>On Loan</NavLink>
                    </li>
                    <li className='nav-item'>
                    <NavLink to="AddNewBook" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>AddNewBook</NavLink>
                    </li>
                </ul>
            </div>

        </div>



    );

}



export default Header