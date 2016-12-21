import React, { Component } from 'react'
import auth from '../firebase/auth'
import PreventDefaultForm from 'prevent-default-form'


class AuthForm extends Component {

    static propTypes = {}

    constructor() {
        super()

        this.state = {

            emailUp: null,
            passUp: null,

            emailIn: null,
            passIn: null,

        }
    }

    _createUserWithEmailAndPassword = () => {
        const { emailUp, passUp } = this.state

        auth.createUserWithEmailAndPassword(emailUp, passUp)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.warn(error)
            })
    }

    _signInWithEmailAndPassword = () => {
        const { emailIn, passIn } = this.state

        auth.signInWithEmailAndPassword(emailIn, passIn)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.warn(error)
            })
    }

    _inputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div>
                <div>
                    <PreventDefaultForm submitLabel='Sign up'
                                        onSubmit={ this._createUserWithEmailAndPassword }>
                        <input type="email" name="emailUp" onChange={ this._inputChange }/>
                        <input type="password" name="passUp" onChange={ this._inputChange }/>
                    </PreventDefaultForm>
                </div>
                <PreventDefaultForm submitLabel='Sign in'
                                    onSubmit={ this._signInWithEmailAndPassword }>
                    <input type="email" name="emailIn" onChange={ this._inputChange }/>
                    <input type="password" name="passIn" onChange={ this._inputChange }/>
                </PreventDefaultForm>
            </div>
        )
    }

}

export default AuthForm
