import React from 'react'

const Persons = ({persons, func}) => {
    return (
        <>
        {persons.map(person =>
                          <div key = {person.id}>
                          <div>
                                {person.name} {person.number}
                                <button onClick={()=>func(person.id, person.name)}>
                                    delete
                                </button>
                          </div>
                          </div>
                      )
                }
        </>
    )

}

export default Persons
