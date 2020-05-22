import React from 'react'

const PersonalForm = ({name, number, adding, changingName, changingNumber}) => (

    <form onSubmit = {adding}>
      <div>
        name: <input value = {name} onChange = {changingName}/>
      </div>
      <div>
        number: <input value = {number} onChange = {changingNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)

export default PersonalForm
