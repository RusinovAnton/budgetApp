import React from 'react'
import enums from '../enums'

import { FetchSelect as Select } from 'react-select3'
import 'react-select3/dist/styles.css'

const ajaxClient = () => enums().then(({ expenseTypes }) => expenseTypes)
const responseDataFormatter = (item) => ({ id: item, text: item })


const SelectExpenseType = props => <Select fetch={{ once: true, ajaxClient, responseDataFormatter }} {...props}/>

export default SelectExpenseType
