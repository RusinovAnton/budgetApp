import React, { Component } from 'react'
import enums from '../enums'
import ErrorMessage from './ErrorMessage'

class SelectExpenseType extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            error: null,
            isPending: true,
            types: null,
        }
    }

    componentDidMount() {
        enums
            .then(({ expenseTypes: types }) => {
                this.setState({ isPending: false, types })
            })
            .catch(error => { this.setState({ error, isPending: false }) })
    }

    render() {
        const { types, isPending, error } = this.state

        if (isPending) return <span>...</span>

        return (
            <span>
                <ErrorMessage message={ error }/>
                <select {...this.props}>
                    { types.map((name, id) =>
                        <option key={ id } value={ id }>{ name }</option>) }
                </select>
            </span>
        )
    }

}

export default SelectExpenseType
