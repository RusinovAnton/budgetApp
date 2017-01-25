import React, { Component, PropTypes } from 'react'
import enums from '../enums'

import ExpensesListItem from './ExpenseListItem'
import ErrorMessage from './ErrorMessage'


class ExpensesList extends Component {
  constructor() {
    super(...arguments)

    this.state = {
      error: null,
      expenseTypes: null,
      isPending: true,
    }
  }

  componentDidMount() {
    enums()
      .then(({ expenseTypes }) => { this.setState({ expenseTypes, isPending: false }) })
      .catch(error => this.setState({ error }))
  }

  render() {
    const { error, expenseTypes, isPending } = this.state
    const { expenses, removeItem, onError } = this.props

    if (!expenses.length) return <span>nothing here yet</span>

    return (
      <div>
        <ErrorMessage message={error}/>
        <table>
          <thead>
          <tr>
            <th/>
            <th>Type</th>
            <th>Sum</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Created at</th>
          </tr>
          </thead>
          <tbody>
          {
            expenses
              .map(({ type, ...expenseItem }, index) => {
                const onRemove = () => { removeItem(index) }

                return <ExpensesListItem key={ index } {...{
                  type: isPending ?
                    '...'
                    : expenseTypes[type], ...expenseItem,
                  onRemove,
                  onError
                }}/>
              })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object)
}

export default ExpensesList
