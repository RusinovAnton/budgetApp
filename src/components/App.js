import React, { Component } from 'react'

import AppDatabase from '../firebase'

import AuthForm from './AuthForm'
import DatabaseForm from './DatabaseForm'
import UserMenu from './UserMenu'

class App extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            user: null,
            error: null,
        }
    }

    componentDidMount() {
        AppDatabase.auth.onAuthStateChanged(this._onAuthStateChange)
    }

    _onAuthStateChange = (user, error) => {
        this.setState({ user, error })

        console.log(user, error)
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
                    <UserMenu user={ user }/>
                    { error && <span className="error">{ error }</span>}
                    <AuthForm isLoggedIn={ !!user }/>
                    { user && <DatabaseForm/> }
                </div>
            </main>
        )
    }
}

export default App
