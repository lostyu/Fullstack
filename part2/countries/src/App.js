import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = (props) => {

  return (
    <div>find countries <input value={props.search} onChange={props.handleSearchChange} /></div>
  )
}

const Countries = ({ search, countries }) => {
  if (search === '') {
    return null;
  }

  if (countries.length > 10) {
    return (
      <p>Too many matches,specify another filter</p>
    )
  }

  if (countries.length <= 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    let country = countries[0];
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages && country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img width="120" height="120" src={country.flag} alt="flag" />
      </div>
    )
  }

  return null
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (ev) => {
    setSearch(ev.target.value)
  }

  const filterCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={filterCountries} search={search} />
    </div>
  )
}

export default App;