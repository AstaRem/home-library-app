import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
    return (

        <div className='navbar'>
            <div className='container'>
                <h3 className='logo'>Shelf</h3>

                <ul className='nav-links'>

                    <li className='nav-item'>
                        <Link to='/Home'>Home</Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/BooksOnLoan'>On Loan</Link>
                    </li>


                </ul>

            </div>

        </div>



    );

}



export default Header