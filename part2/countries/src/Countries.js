import React from 'react'

const Countries = ({show}) => {
    console.log()
    if (show.length >= 1){
        return(
            <div>
                {show.map(country => <div key = {country.name}>
                                     <h2>{country.name}</h2>
                                     <div>capital {country.capital}</div>
                                     <div>population {country.population}</div>
                                     <h3>languages</h3>
                                     <ul>
                                        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
                                     </ul>
                                     <img src={country.flag} height = "50" width = "75" alt="new"/>
                                     </div>)}
            </div>
        )
    }
    else {
        return (
            <div>Too many matched, specify another filter</div>
        )
    }
}

export default Countries
