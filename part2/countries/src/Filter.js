import React from 'react'

const Filter = ({filter, func}) => (
    <div>
        find countries: <input value = {filter} onChange = {func}/>
    </div>
)

export default Filter
