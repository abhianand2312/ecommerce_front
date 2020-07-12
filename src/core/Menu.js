import React, {Fragment} from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
import {itemTotal} from './cartHelpers';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#ff9900'}
    }
    else {
        return {color: '#ffffff'}
    }
}

const Menu = ({history}) => (
    <div>
        {/* <a class="navbar-brand mr-10" style={{color: 'red'}} href="#">Navbar</a> */}
        <ul className="nav nav-tabs bg-primary justify-content-end">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to='/'>Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/shop')} to='/shop'>Shop</Link>
            </li>

            {isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/cart')} to='/cart'>
                            Cart{" "} <sup><small className="cart-badge">{itemTotal()}</small></sup>
                        </Link>
                    </li>
                </Fragment>
            )}
            

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashboard')} to='/user/dashboard'>Dashboard</Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>Dashboard</Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to='/signup'>Signup</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to='/signin'>Signin</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <div>
                    <li className="nav-item">
                        <span className="nav-link" style={{cursor: "pointer", color: '#ffffff'}} onClick={() => 
                            signout(() => {
                                history.push('/');
                            })}>Signout</span>
                    </li>
                </div>
            )}
        </ul>
    </div>
    
);


export default withRouter(Menu);