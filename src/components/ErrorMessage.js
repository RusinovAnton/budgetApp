import React, { PropTypes } from 'react'

const ErrorMessage = ({ message }) => message ?
    <span className="error">{ message }</span>
    : null

ErrorMessage.propTypes = {
    message: PropTypes.string
}

export default ErrorMessage
