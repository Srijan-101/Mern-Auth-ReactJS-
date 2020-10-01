import React, { useState, useRef, useEffect } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import Message from '../components/Message'
import jwt from 'jsonwebtoken'

const Reset = ({ history, match }) => {
  const [values, setValues] = useState({
    password: '',
    repassword: '',
    token : '',
    type: '',
    error: '',
    message: '',
    buttonText: 'Reset'
  })

  const {
    email,
    password,
    repassword,
    buttonText,
    message,
    token,
    type,
    error
  } = values

  const onChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  useEffect(() => {
        let token = match.params.token;
        const {name} = jwt.decode(token);
        if(token) {
          setValues({...values,name,token})
        }
  },[])

  const onSubmit = e => {
    if (password !== repassword) {
      e.preventDefault()
      setValues({
        ...values,
        message: 'Password not matching!',
        error: true,
        type: 'danger'
      })
    } else {
      e.preventDefault()
      setValues({ ...values, buttonText: 'Requesting...' })
      axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/reset-password`,
        data: {newPassword: repassword, resetPasswordlink : token }
      })
        .then(response => {
          setValues({
            ...values,
            buttonText: 'Reset',
            error: true,
            message: response.data.message,
            type: 'primary'
          }) 
          setTimeout(() => {
            history.push('/signin');
          },3000)
        })
        .catch(error => {
          console.log(error.response.data.error);
          setValues({
            ...values,
            buttonText: 'Reset',
            error: true,
            message: error.response.data.error,
            type: 'danger'
          })
        })
    }
  }

  const PasswordForgot = () => {
    return (
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label forhtml='exampleInputEmail1'>Password</label>
          <input
            type='password'
            onChange={onChange('password')}
            className='form-control'
            placeholder='Enter password'
            required='required'
          />
        </div>
        <div className='form-group'>
          <label forhtml='exampleInputEmail1'>Re-enter Password</label>
          <input
            type='password'
            onChange={onChange('repassword')}
            value={email}
            className='form-control'
            placeholder='Re-enter password'
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
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-sm-12'>
            <h2 className='p-5 text-center'>
              Reset your password.Dont share this link.
            </h2>
            {error ? <Message message={message} type={type} /> : null}
            {PasswordForgot()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Reset
