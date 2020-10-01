import React, { useState } from 'react'
import Layout from '../core/Layout';
import axios from 'axios'
import Message from '../components/Message'


const Forgot = ({history}) => {
    const [values, setValues] = useState({
        email: "",
        buttonText: "Reset",  
    })

    const {email,buttonText,message,type,error} = values;


    const onChange = name => event =>{
        setValues({...values,[name]:event.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({...values,buttonText:'Requesting...'})
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/forgot-password`,
            data :{email}
        })
        .then(response => {
                setValues({...values,buttonText:'Reset',error:true,message:response.data.message,type:'primary'}); 
        })
        .catch(error => {
            setValues({...values,buttonText:'Reset',error:true,message:error.response.data.error,type:'danger'});
        })
}

    const PasswordForgotform = () => {
        return (
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label forhtml="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={onChange('email')} value={email} className="form-control" placeholder="Enter name" required="required"/>
                </div>
                <button type="submit" className="btn btn-primary">{buttonText}</button>
            </form>
        )
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-sm-12">
                  <h2 className="p-5 text-center">Trouble Logging In?</h2>
                  {error ? <Message message = {message}  type={type}/> : null }
                  {PasswordForgotform()}
                  </div>
                </div>
            </div>
        </Layout>
    )
}

export default Forgot;