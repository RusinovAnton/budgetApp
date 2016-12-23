import React, { Component, PropTypes } from 'react'
import AppDatabase from '../firebase'
import Form from 'prevent-default-form'
import Loader from './Loader'


class DatabaseForm extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired
    }

    constructor() {
        super(...arguments)

        this.ref = AppDatabase.ref(arguments[0].uid)
        this.state = {
            expenses: null,
            sum: null,
            title: null,
            isPending: true,
        }
    }

    componentDidMount() {
        this.ref
            .on('value', snapshot => {
                this.setState({ expenses: snapshot.child('expenses').val() || [], isPending: false })
            })
    }

    _setDatabaseValue = value => {
        const { uid } = this.props

        AppDatabase.set(`${uid}/expenses`, value)
            .catch(error => { this.setState({ error: error.message }) })
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
        const { expenses, isPending } = this.state

        if (!expenses && isPending) return <Loader/>

        return (
            <div>
                { isPending && <Loader/> }
                <Form onSubmit={ this._submitExpenseItem }>
                    <input type="number" step='any' name="sum" onChange={ this._onInputChange }/>
                    <input type="text" name="title" onChange={ this._onInputChange }/>
                </Form>
                { expenses.length ?
                    expenses
                        .map(({ sum, title }, index) => {
                            const removeItem = () => { this._removeExpenseItem(index) }

                            return (
                                <p key={ index }>
                                    sum: { sum }, title: { title } <span className="cursor-pointer"
                                                                         onClick={ removeItem }>&times;</span>
                                </p>
                            )
                        })
                    : 'nothing here yet'
                }
            </div>
        )
    }
}

export default DatabaseForm
