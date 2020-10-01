import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios'
import Message from '../components/Message'
import { authenticate, isAuth } from './helper';
import Google from './Google'
import Facebook from './Facebook'

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false,
        message: "",
        type: "",
        buttonText: "Login",
    })

    const { email, password, buttonText, message, type, error } = values;


    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Login..' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
            //User signIn
            .then(response => {
                authenticate(response, () => {
                    setValues({ ...values, email: ' ', password: '', error: false, buttonText: 'Login..', message: '', type: 'primary' });
                    isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
                })
            })
            .catch(error => {
                setValues({ ...values, buttonText: 'submit', error: true, message: error.response.data.error, type: 'danger' });
            })
    }

    const informParent = response => {
        authenticate(response, () => {
            setValues({ ...values, email: ' ', password: '', error: false, buttonText: 'Login..', message: '', type: 'primary' });
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        })
    }

    const SigninForm = () => {
        return (
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label forhtml="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={onChange('email')} value={email} className="form-control" placeholder="Enter name" required="required" />
                </div>

                <div className="form-group">
                    <label forhtml="exampleInputEmail1">Password</label>
                    <input type="password" onChange={onChange('password')} value={password} className="form-control" placeholder="Enter password" required="required" />
                </div>
                <br />
                <div className="conatiner">
                    <div className="row">
                        <div className="col-lg-2 col-sm-4">
                            <button type="submit" className="btn btn-primary">{buttonText}</button>
                        </div>
                        <div className="col-lg-8 col-sm-8">
                            <Link to="/auth/password">
                                <div className="form-text text-muted">Forgot password ?</div>
                            </Link>
                        </div>
                    </div>
                </div>

            </form>
        )
    }

    return (
        <Layout>
            {isAuth() ? <Redirect to="/" /> : null}
            <div className="container">
               
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-10">
                        <h2 className="p-5 text-center">Login</h2>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 d-flex justify-content-center"><Google informParent={informParent}/></div>
                                <div className="col-lg-6 d-flex justify-content-center"><Facebook informParent={informParent} values={values} setValues={setValues}/></div>
                            </div>
                        </div>
                        
                        {error ? <Message message={message} type={type} /> : null}
                        {SigninForm()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signin;