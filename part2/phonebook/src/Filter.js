import React from 'react'

const Filter = ({filter, func}) => (
    <div>
        filter shown with: <input value = {filter} onChange = {func}/>
    </div>
)

export default Filter 
