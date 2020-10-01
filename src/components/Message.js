import React from 'react'

const Message = ({message,type}) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            <center>{message}</center>
        </div>
    )
}

export default Message;