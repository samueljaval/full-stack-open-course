import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'


const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filtered = countries.filter(country => country.name.toLowerCase().includes(newFilter))
  const toShow = filtered.length < 10 ? filtered : []
  const handleChangeFilter = (event) => setNewFilter(event.target.value.toLowerCase())


  return (
    <div>
      <Filter filter = {newFilter} func = {handleChangeFilter}/>
      <Countries show = {toShow}/>
    </div>
  )

}

export default App
