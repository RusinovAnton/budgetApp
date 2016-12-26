import React, { Component } from 'react'

import AppDatabase from '../appBase'
import ErrorMessage from './ErrorMessage'
import ExpensesList from './ExpensesList'
import Form from 'prevent-default-form'
import Loader from './Loader'
import SelectExpenseType from './SelectExpenseType'


class ExpensesForm extends Component {
    constructor() {
        super(...arguments)

        this.state = ExpensesForm._getInitialState({ isPending: true })
    }

    static _getInitialState = state => Object.assign({
        expenses: null,
        error: null,
        isPending: false,
        sum: '',
        title: '',
        type: '',
    }, state)

    componentDidMount() {
        AppDatabase.currentUser()
            .on('value', snapshot => {
                snapshot.val()
                this.setState({ expenses: snapshot.child('expenses').val() || [], isPending: false })
            })
    }

    _onError = error => { this.setState({ error })}

    _setDatabaseValue = value => {
        AppDatabase.currentUser('/expenses', value)
            .then(() => {
                this.setState(ExpensesForm._getInitialState({ expenses: this.state.expenses }))
            })
            .catch(error => { this.setState({ error: error.message }) })
    }

    _submitExpenseItem = () => {
        const { expenses, sum, title, type } = this.state

        this._setDatabaseValue(expenses.concat({ sum, title, type }))
    }

    _onInputChange = ({ target: { type, name, value } }) => {
        let inputValue = value

        if (type === 'number') {
            inputValue = parseFloat(value) || ''
        }

        this.setState({ [name]: inputValue })
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
        const { expenses, error, sum, title, type, isPending } = this.state

        if (!expenses && isPending) return <Loader/>

        return (
            <div>
                { isPending && <Loader/> }
                <ErrorMessage message={ error }/>
                <Form onSubmit={ this._submitExpenseItem }>
                    <SelectExpenseType name='type' value={ type } onChange={ this._onInputChange }/>
                    <input type="number" value={ sum } step='any' name="sum" onChange={ this._onInputChange }/>
                    <input type="text" value={ title } name="title" onChange={ this._onInputChange }/>
                </Form>
                <ExpensesList expenses={ expenses } removeItem={ this._removeExpenseItem } onError={ this._onError }/>
            </div>
        )
    }
}

export default ExpensesForm
