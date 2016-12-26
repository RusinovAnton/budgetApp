import React, { Component, PropTypes } from 'react'
import enums from '../enums'


class ExpenseListItem extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            isPending: true,
            types: null,
        }
    }

    // TODO: lift this up
    componentDidMount() {
        enums
            .then(({ expenseTypes: types }) => {this.setState({ types, isPending: false })})
            .catch(error => this.props.onError(error))
    }

    render() {
        const { isPending, types } = this.state
        const { type, sum, title, onRemove } = this.props

        return (
            <p className="expense-item">
                <span className="cursor-pointer onRemove" onClick={ onRemove }>&times;</span>
                { type && <span>type: { isPending ? '...' : types[type] },</span> }
                <span>sum: { sum },</span>
                <span>title: { title },</span>
            </p>
        )
    }
}

ExpenseListItem.propTypes = {
    onError: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    sum: PropTypes.number.isRequired,
    title: PropTypes.string,
    type: PropTypes.oneOf(['', '0', '1', '2', '3', '4', '5', '6', '7']),
}

export default ExpenseListItem
