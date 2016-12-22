import React, { Component } from 'react'

import firebase from '../firebase/base'
import { dbSetValue } from '../firebase/database'

import Form from 'prevent-default-form'


class DatabaseForm extends Component {

    constructor() {
        super(...arguments)

        this.state = {
            expenses: [],
            sum: null,
            title: null,
        }
    }

    componentDidMount() {
        firebase.database()
            .ref('expenses')
            .on('value', snapshot => {
                this.setState({ expenses: snapshot.val() || [] })
            })
    }

    _setDatabaseValue = value => {
        dbSetValue('expenses', value)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    _submitExpenseItem = () => {
        const { expenses, sum, title } = this.state

        this._setDatabaseValue(expenses.concat({ sum, title }))
    }

    _onInputChange = ({ target: { type, name, value } }) => {
        this.setState({ [name]: type === 'number' ? parseFloat(value) : value })
    }

    _removeExpenseItem = index => {
        const { expenses: oldExpenses } = this.state

        const expenses = oldExpenses
            .slice(0, index)
            .concat(oldExpenses
                .slice(index + 1))

        this._setDatabaseValue(expenses)
    }

    render() {
        const { expenses } = this.state

        return (
            <div>
                <Form onSubmit={ this._submitExpenseItem }>
                    <input type="number" step='any' name="sum" onChange={ this._onInputChange }/>
                    <input type="text" name="title" onChange={ this._onInputChange }/>
                </Form>
                { expenses
                    .map(({ sum, title }, index) => {
                        const removeItem = () => { this._removeExpenseItem(index) }

                        return (
                            <p key={ index }>
                                sum: { sum }, title: { title } <span className="cursor-pointer"
                                                                     onClick={ removeItem }>&times;</span>
                            </p>
                        )
                    })
                }
            </div>
        )
    }

}

export default DatabaseForm
