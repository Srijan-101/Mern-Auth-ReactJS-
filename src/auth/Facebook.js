import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook = ({ informParent = f => f ,values,setValues}) => {
  const style = {
      background:'white',
      border:'none',
      boxShadow :'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
      fontSize: 14,
      color:'rgba(0, 0, 0, 0.54)',
      display: 'inline-flex',
      alignItems:'center'
  }

  const {message, type, error } = values;
  
  const  facebookResponse = response => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userid :response.id , accessToken : response.accessToken}
    })
      .then(response => {
        informParent(response);
      })
      .catch(error => {
        console.log(error);
        setValues({ ...values, buttonText: 'submit', error: true, message: error.response.data.error, type: 'danger' });
      })
  }

  return (
    <div className='p-3'>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK}`}
        autoLoad={false}
        callback = {facebookResponse}
        render={renderProps => (
          <button  style ={style} onClick={renderProps.onClick}>
            <i className="fab fa-facebook-square" style={{fontSize:21,padding:5,color:'#385898'}}></i>
            <span style={{padding: '10px 7px 10px 0px'}}>Continue with facebook</span></button>
        )}
      />
    </div>
  )
}

export default Facebook
