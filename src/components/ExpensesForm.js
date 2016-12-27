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
        date: '',
        error: null,
        expenses: null,
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
        this.setState({ isPending: true })

        AppDatabase.currentUser('/expenses', value)
            .then(() => {
                this.setState(ExpensesForm._getInitialState({ isPending: false, expenses: this.state.expenses }))
            })
            .catch(error => { this.setState({ isPending: false, error: error.message }) })
    }

    _getCurrentDate = () => {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm + '-' + dd;
    }

    _submitExpenseItem = () => {
        const { expenses, sum, title, type, date } = this.state

        if (!sum || !title || !type || !date) return

        const expenseItem = { sum, title, type, date, createdAt: this._getCurrentDate() }

        this._setDatabaseValue(expenses.concat(expenseItem))
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
        const { expenses, date, error, sum, title, type, isPending } = this.state

        if (!expenses && isPending) return <Loader/>

        return (
            <div>
                { isPending && <Loader/> }
                <ErrorMessage message={ error }/>
                <Form buttonProps={{ disabled: isPending }} onSubmit={ this._submitExpenseItem }>
                    <SelectExpenseType name='type' value={ type } onChange={ this._onInputChange }/>
                    <input type="number" value={ sum } step='any' name="sum" onChange={ this._onInputChange }/>
                    <input type="text" value={ title } name="title" onChange={ this._onInputChange }/>
                    <input type="date" value={ date } name='date' onChange={ this._onInputChange }/>
                </Form>
                <ExpensesList expenses={ expenses } removeItem={ this._removeExpenseItem } onError={ this._onError }/>
            </div>
        )
    }
}

export default ExpensesForm
