import React, { PropTypes } from 'react'


const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

const Form = ({ children, submitLabel, onSubmit, buttonClassName, ...props }) => (
  <form onSubmit={ preventDefault(onSubmit) } { ...props }>
    { children }
    <button className={ buttonClassName } type="submit">{ submitLabel || 'Submit' }</button>
  </form>
)

Form.propTypes = {
  buttonClassName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
}

export default Form
