import React, { Component } from 'react'

import AppDatabase from '../appBase'

import AuthForm from './AuthForm'
import ExpensesForm from './ExpensesForm'
import ErrorMessage from './ErrorMessage'
import Loader from './Loader'
import UserMenu from './UserMenu'

class App extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            error: null,
            isPending: true,
            user: null,
        }
    }

    componentDidMount() {
        AppDatabase.auth.onAuthStateChanged(this._onAuthStateChange)
    }

    _onAuthStateChange = (user, error) => {
        this.setState({ user, error, isPending: false })
    }

    _signOut = () => {
        AppDatabase.auth.signOut()
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        const { error, isPending, user } = this.state

        if (isPending) return <Loader/>

        return (
            <main>
                <UserMenu user={ user } onSignOut={ this._signOut }/>
                <div className="container">
                    <h2>Budget App</h2>
                    <ErrorMessage message={ error }/>
                    { user ?
                        <ExpensesForm />
                        : <AuthForm />
                    }
                </div>
            </main>
        )
    }
}

export default App
