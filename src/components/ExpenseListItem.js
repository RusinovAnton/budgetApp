import React, { PropTypes } from 'react'


const ExpenseListItem = ({ type, sum, title, date: expenseDate, createdAt, onRemove }) => (
    <tr className="expense-item">
        <td><span className="cursor-pointer onRemove" onClick={ onRemove }>&times;</span></td>
        <td>{ type }</td>
        <td>{ sum }</td>
        <td>{ title }</td>
        <td>{ expenseDate }</td>
        <td>{ createdAt }</td>
    </tr>
)

ExpenseListItem.propTypes = {
    createdAt: PropTypes.string,
    expenseDate: PropTypes.string,
    onError: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    sum: PropTypes.number.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
}

export default ExpenseListItem
