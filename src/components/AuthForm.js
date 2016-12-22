import React, { Component, PropTypes } from 'react'
import auth from '../firebase/auth'
import PreventDefaultForm from 'prevent-default-form'


class AuthForm extends Component {

    static propTypes = {
        isLoggedIn: PropTypes.bool,
    }

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
            .catch(error => {
                console.warn(error)
            })
    }

    _signInWithEmailAndPassword = () => {
        const { emailIn, passIn } = this.state

        auth.signInWithEmailAndPassword(emailIn, passIn)
            .catch(error => {
                console.warn(error)
            })
    }

    _inputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    _signOut = () => {
        auth.signOut()
            .catch(error => {
                console.warn(error)
            })
    }

    render() {
        const { isLoggedIn } = this.props


        return (
            <div>
                { isLoggedIn ?
                    (
                        <button onClick={ this._signOut }>Sign out</button>
                    ) :
                    (
                        <div>
                            <PreventDefaultForm submitLabel='Sign up'
                                                onSubmit={ this._createUserWithEmailAndPassword }>
                                <input type="email" name="emailUp" onChange={ this._inputChange }/>
                                <input type="password" name="passUp" onChange={ this._inputChange }/>
                            </PreventDefaultForm>
                            <PreventDefaultForm submitLabel='Sign in'
                                                onSubmit={ this._signInWithEmailAndPassword }>
                                <input type="email" name="emailIn" onChange={ this._inputChange }/>
                                <input type="password" name="passIn" onChange={ this._inputChange }/>
                            </PreventDefaultForm>
                        </div>
                    )
                }
            </div>
        )
    }

}

export default AuthForm
