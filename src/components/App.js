import React, { Component } from 'react'
import AuthForm from './AuthForm'

import auth from '../firebase/auth'

class App extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            user: null,
            error: null,
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(this._onAuthStateChange)
    }

    _onAuthStateChange = (user, error) => {
        this.setState({ user, error })

        if (user === null) {
            console.log('logged off')
            return
        }

        console.log(user)
    }

    _onGettingUser = user => {
        this.setState({ user })
    }

    render() {
        const { user, error } = this.state

        return (
            <div className="container">
                <h1>Budget App</h1>
                { error && <span className="error">{ error }</span>}
                <AuthForm user={ user }/>
            </div>
        )
    }
}

export default App
