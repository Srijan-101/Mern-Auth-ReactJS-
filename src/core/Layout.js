import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import logo from '../logo.svg'
import { isAuth, signOut } from '../auth/helper';


const Layout = ({ children, match, history }) => {

const isActive = (path) => {
        if (match.path === path) {
            return { color: '#61d9fb' }
        } else {
            return { color: 'black' }
        }
}




    const nav = () => {
        
        return (
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <img src={logo} height="100" width="100" alt="brand-logo" />
                </div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
                    </li>
                    {
                        !isAuth() && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link" style={isActive('/signup')}>Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signin" className="nav-link" style={isActive('/signin')}>Login</Link>
                                </li>
                            </Fragment>
                        )
                    }


                    {
                        isAuth() && isAuth().role === "subscriber" ? (
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive('/private')} to="/private">{isAuth().name}</Link>
                            </li> 
                        ):null
                    }
                    {
                        isAuth() && isAuth().role === "admin" ? (
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive('/admin')} to="/admin">{isAuth().name}</Link>
                            </li>
                        ):null
                    }

                    {
                        isAuth() && (
                            <li className="nav-item">
                                <button type="button"
                                    className="btn btn-success btn-sm"
                                    style={{ cursor: 'pointer', marginTop: 4 }}
                                    onClick={() => {
                                        signOut(() => {
                                            history.push('/');
                                        })
                                    }}
                                >
                                    Logout
                                    </button>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }

    return (
        <Fragment>
            {nav()}
            <div className="container">
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);