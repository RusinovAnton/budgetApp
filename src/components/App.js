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
            <main>
                <aside className="sidebar">
                    <h2>Sidebar</h2>
                    <ul>
                        <li>some</li>
                        <li>bullet</li>
                        <li>list :D</li>
                    </ul>
                </aside>
                <div className="container">
                    <h2>Budget App</h2>
                    { error && <span className="error">{ error }</span>}
                    <AuthForm user={ user }/>
                </div>
            </main>
        )
    }
}

export default App
