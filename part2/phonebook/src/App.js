import React, { useState , useEffect} from 'react'
import Filter from './Filter'
import PersonalForm from './PersonalForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')


  useEffect(() => {
  personService
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
    })
  }, [])

  const addPerson = (event) => {
      event.preventDefault()
      const names = persons.map(person => person.name)
      const newObject = {name : newName, number : newNumber}
      if (names.includes(newName)) {
          const idNewName = persons.filter(person => person.name === newName)[0].id
          const ask = window.confirm(newName + " is already added to the phonebook, replace th old number with the old one?")
          if (ask){
              personService
                    .changeNum(idNewName, newObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person =>
                                        person.id !== idNewName
                                        ? person
                                        : returnedPerson))
                    })
                    .catch(error => {
                        setColor('red')
                        setMessage(`Information of ${newName} has already been removed from server`)
                        setTimeout(() => {setMessage(null)}, 5000)
                        // setColor('green')
                    })
            setColor('green')
            setMessage(`Added ${newName}`)
            setTimeout(() => {setMessage(null)}, 5000)
          }

      }
      else {
            personService
                .create(newObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
            setColor('green')
            setMessage(`Added ${newName}`)
            setTimeout(() => {setMessage(null)}, 5000)
      }
      setNewName('')
      setNewNumber('')
  }

  const removeName = (id, name) => {
      const ask = window.confirm("Delete " + name + " ?")
      if (ask) {
          personService.deleteName(id)
          setPersons(persons.filter(person => person.id !== id))
      }
  }

  const filtered = persons.filter(person => person.name.toLowerCase().includes(newFilter))


  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangeNumber = (event) => setNewNumber(event.target.value)
  const handleChangeFilter = (event) => setNewFilter(event.target.value.toLowerCase())


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} color = {color}/>
      <Filter filter = {newFilter} func = {handleChangeFilter}/>
      <h2> add a new </h2>
      <PersonalForm name = {newName}
                    number = {newNumber}
                    adding = {addPerson}
                    changingName = {handleChangeName}
                    changingNumber = {handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons persons = {filtered} func = {removeName}/>
    </div>
  )

}

export default App
