import React from 'react';
import axios from 'axios'
import { authenticate, isAuth } from './helper';
import { GoogleLogin } from 'react-google-login';

const Google = ({informParent = f => f}) => {
    const responseGoogle = (response) => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                informParent(response);
            })
            .catch(error => {
               console.log(error);
            });
    }

    return (
        <div className="p-3">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE}`}
                buttonText="Continue with google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google;