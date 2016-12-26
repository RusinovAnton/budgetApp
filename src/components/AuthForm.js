import React, { Component } from 'react'
import AppDatabase from '../appBase'
import PreventDefaultForm from 'prevent-default-form'


class AuthForm extends Component {
    constructor() {
        super()

        this.state = {
            error: null,
            // Sign up form
            emailUp: null,
            passUp: null,
            // Sign in form
            emailIn: null,
            passIn: null,
        }
    }

    _createUserWithEmailAndPassword = () => {
        const { emailUp, passUp } = this.state

        AppDatabase.auth.createUserWithEmailAndPassword(emailUp, passUp)
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    _signInWithEmailAndPassword = () => {
        const { emailIn, passIn } = this.state

        AppDatabase.auth.signInWithEmailAndPassword(emailIn, passIn)
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    _inputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    render() {
        const { error } = this.state

        return (
            <div className="authForm">
                { error && <p className="error-message">{ error }</p>}
                <PreventDefaultForm submitLabel='Sign up'
                                    buttonProps={{ className: 'red' }}
                                    onSubmit={ this._createUserWithEmailAndPassword }>
                    <input type="email" name="emailUp" onChange={ this._inputChange }/>
                    <input type="password" name="passUp" onChange={ this._inputChange }/>
                </PreventDefaultForm> - or - <PreventDefaultForm submitLabel='Sign in'
                                                                 buttonProps={{ className: 'green' }}
                                                                 onSubmit={ this._signInWithEmailAndPassword }>
                <input type="email" name="emailIn" onChange={ this._inputChange }/>
                <input type="password" name="passIn" onChange={ this._inputChange }/>
            </PreventDefaultForm>
            </div>
        )
    }
}

export default AuthForm
