import React, { PropTypes } from 'react'

import ExpensesListItem from './ExpenseListItem'

const ExpensesList = ({ expenses, removeItem, onError }) => (
    <span>
        {
            expenses.length ?
                expenses
                    .map((expenseItem, index) => {
                        const onRemove = () => { removeItem(index) }

                        return <ExpensesListItem key={ index } {...{ ...expenseItem, onRemove, onError }}/>
                    })
                : 'nothing here yet'
        }
    </span>
)

ExpensesList.propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.object)
}

export default ExpensesList
