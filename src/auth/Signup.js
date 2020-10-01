import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import Message from '../components/Message'
import { isAuth, authenticate } from './helper'
import Google from './Google'
import Facebook from './Facebook'

const Signup = ({ history }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    message: '',
    type: '',
    buttonText: 'Submit'
  })

  const { name, email, password, buttonText, message, type, error } = values

  const onChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const informParent = response => {
    authenticate(response, () => {
      setValues({
        ...values,
        email: ' ',
        password: '',
        error: false,
        buttonText: 'Login..',
        message: '',
        type: 'primary'
      })
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private')
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
      .then(response => {
        setValues({
          ...values,
          name: ' ',
          email: ' ',
          password: '',
          error: true,
          buttonText: 'Submitted',
          message: response.data.message,
          type: 'primary'
        })
      })
      .catch(error => {
        setValues({
          ...values,
          buttonText: 'submit',
          error: true,
          message: error.response.data.error,
          type: 'danger'
        })
      })
  }

  const SignupForm = () => {
    return (
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label forhtml='exampleInputEmail1'>Name</label>
          <input
            type='text'
            onChange={onChange('name')}
            value={name}
            className='form-control'
            placeholder='Enter name'
            required='required'
          />
        </div>

        <div className='form-group'>
          <label forhtml='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            onChange={onChange('email')}
            value={email}
            className='form-control'
            placeholder='Enter name'
            required='required'
          />
          <div className='form-text text-muted'>
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className='form-group'>
          <label forhtml='exampleInputEmail1'>Password</label>
          <input
            type='password'
            onChange={onChange('password')}
            value={password}
            className='form-control'
            placeholder='Enter password'
            required='required'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          {buttonText}
        </button>
      </form>
    )
  }

  return (
    <Layout>
      {isAuth() ? <Redirect to='/' /> : null}
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-sm-12'>
            <h2 className='p-5 text-center'>Signup</h2>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-lg-6 d-flex justify-content-center'>
                  <Google informParent={informParent} />
                </div>
                <div className='col-lg-6 d-flex justify-content-center'>
                  <Facebook
                    informParent={informParent}
                    values={values}
                    setValues={setValues}
                  />
                </div>
              </div>
            </div>
            {error ? <Message message={message} type={type} /> : null}
            {SignupForm()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
