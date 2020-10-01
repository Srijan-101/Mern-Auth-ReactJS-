import React, { useState, useEffect ,useRef} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import Message from '../components/Message'
import {
  authenticate,
  isAuth,
  getCookie,
  signOut,
  updateUser
} from '../auth/helper'

const Private = ({ history }) => {
  const token = getCookie('token')
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    error: false,
    message: '',
    type: '',
    buttonText: 'Update'
  })

  const {
    role,
    name,
    email,
    password,
    buttonText,
    message,
    type,
    error
  } = values

  const onChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const { role, name, email } = res.data
        setValues({ ...values, role, name, email })
      })
      .catch(err => {
        if (err.response.status === 401) {
          signOut(() => {
            history.push('/')
          })
        }
      })
  }

  useEffect(() => {
    loadProfile()
  }, [])

  let timeId = useRef(null);
    useEffect(() => {
         return ()=>{
             clearTimeout(timeId);
         }
    },[])

  const onSubmit = e => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Updating...' })
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password }
    })
      //User update
      .then(response => {
        updateUser(response, () => {
          setValues({
            ...values,
            error: true,
            buttonText: 'Update',
            message: 'profile updates sucessfully!',
            type: 'primary'
          })
           timeId = setTimeout(() => {
            setValues({
                ...values,
                error: false,
              })
           },5000)
        })
      })
      .catch(error => {
        setValues({
          ...values,
          buttonText: 'Update',
          error: true,
          message: error.response.data.error,
          type: 'danger'
        })
        timeId = setTimeout(() => {
            setValues({
                ...values,
                error: false,
              })
           },5000)
      })
  }

  const UpdateForm = () => {
    return (
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label forhtml='exampleInputEmail1'>Role</label>
          <input type='text' readOnly value={role} className='form-control' />
        </div>

        <div className='form-group'>
          <label forhtml='exampleInputEmail1'>Email</label>
          <input type='email' readOnly value={email} className='form-control' />
        </div>

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
          <label forhtml='exampleInputEmail1'>Password</label>
          <input
            type='password'
            onChange={onChange('password')}
            value={password}
            className='form-control'
            placeholder='Enter password'
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
          <div className='col-6'>
            <h2 className='p-5 text-center'>Profile Update</h2>
            {error ? <Message message={message} type={type} /> : null}
            {UpdateForm()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Private
