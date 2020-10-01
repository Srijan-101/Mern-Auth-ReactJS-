import React, { useState ,useEffect } from 'react'
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import Message from '../components/Message'

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name : "",
        token : "",
        error : false,
        message : '',
        type :'',
        show : true
    })
    const {name,token,error,message,type} = values;

    useEffect(() => {
         let token = match.params.token
         let {name} = jwt.decode(token);
         if(token){
             setValues({...values ,name,token})
         }
    },[])

    
    const onSubmit = () => {
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/account-activation`,
            data : {token}
        })
        .then(response => {
            setValues({...values ,error:true,message:response.data.message,type:'success'});
        })
        .catch(error => {
            setValues({...values ,error:true,message:error.response.data.error,type:'danger'})
        })
    }

    const ActivationLink = () => {
        return (
            <>
            <h2 className="p-5 text-center">Hey {name}, Ready to activate your account</h2>
              <center><button type="button" className="btn btn-success" onClick={onSubmit}>Activate Account</button></center>  
            </>
        )
    }

     

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-cente">
                  <div className="col-6  offset-md-3 p-5">
                  {error ? <Message message = {message}  type={type}/> : null}
                  {ActivationLink()}
                  </div>
                </div>
            </div>
        </Layout>
    )
}

export default Activate;