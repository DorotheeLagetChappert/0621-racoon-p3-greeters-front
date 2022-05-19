import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import { LangueContext } from '../../context/langueContext'

import GreetersPaginationFiltered from '../../components/GreetersPaginationFiltered/GreetersPaginationFiltered'

import './MeetGreeterBar.css'

const animatedComponents = makeAnimated()

const customStyles = {
  option: provided => ({
    ...provided,
    borderBottom: '1px dotted red',
    padding: 10
  }),
  valueContainer: provided => ({
    ...provided,
    justifyContent: 'center',
    marginTop: '5px',
    '@media only screen and (max-width: 500px)': {
      ...provided['@media only screen and (max-width: 500px)'],
      marginLeft: '10px',
      fontSize: 'small'
    }
  }),
  placeholder: provided => ({
    ...provided,
    color: 'rgba(0, 0, 0, 0.5)'
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none'
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: 'none'
  }),
  control: (_, { selectProps: { width } }) => ({
    // none of react-select's styles are passed to <Control />
    display: 'flex',
    height: 'auto',
    width: width
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return { ...provided, opacity, transition }
  }
}

const MeetGreeterBar = () => {
  // states

  const [theme, setTheme] = useState([])
  const [city, setCity] = useState([])
  const [langue, setLangue] = useState([])
  // states for inputs

  const [selectedOptionsCity, setSelectedOptionsCity] = useState([])
  const [selectedOptionsThem, setSelectedOptionsThem] = useState([])
  const [selectedOptionsLang, setSelectedOptionsLang] = useState([])

  //languages
  const language = useContext(LangueContext)
  const englishMode = language.state.englishMode
  // fetch all thematics from data

  useEffect(() => {
    const getData = async () => {
      const resData = await axios.get(
        `${process.env.REACT_APP_API_ROUTE}/thematic`
      )
      setTheme(resData.data)
    }
    getData()
  }, [])

  // fetch all languages from data

  useEffect(() => {
    const getData = async () => {
      const resData = await axios.get(
        `${process.env.REACT_APP_API_ROUTE}/languages`
      )
      setLangue(resData.data)
    }
    getData()
  }, [])

  // fetch all cities from data

  useEffect(() => {
    const getData = async () => {
      const resData = await axios.get(`${process.env.REACT_APP_API_ROUTE}/city`)
      setCity(resData.data)
    }
    getData()
  }, [])

  const handleFiltersCity = e => {
    setSelectedOptionsCity(e)
  }
  const handleFiltersThem = e => {
    setSelectedOptionsThem(e)
  }
  const handleFiltersLang = e => {
    setSelectedOptionsLang(e)
  }

  return (
    <>
      <nav className='meetbar'>
        <div className='meet-items'>
          <Select
            styles={customStyles}
            components={animatedComponents}
            onChange={handleFiltersThem}
            options={theme
              .sort((a, b) =>
                a.thematic_name_fr.localeCompare(b.thematic_name_fr)
              )
              .map(({ thematic_name_fr }) => ({
                value: thematic_name_fr,
                label: thematic_name_fr
              }))}
            className='meet-select'
            placeholder={englishMode ? 'Thematics' : 'Thématiques'}
            isMulti
            autoFocus
            isSearchable
            noOptionsMessage={() =>{englishMode ? 'All themes are already selected' : 'Tous les thèmes sont déja sélectionnés'}}
          />
          <Select
            styles={customStyles}
            components={animatedComponents}
            onChange={handleFiltersCity}
            options={city.map(({ city_name }) => ({
              value: city_name,
              label: city_name
            }))}
            className='meet-select'
            placeholder={englishMode ? 'Cities' : 'Villes'}
            isMulti
            autoFocus
            isSearchable
            noOptionsMessage={() => {englishMode ? 'All cities are already selected' : 'Toutes les villes sont déja sélectionnées'}}
          />
          <Select
            styles={customStyles}
            components={animatedComponents}
            onChange={handleFiltersLang}
            options={langue.map(({ language_name_fr }) => ({
              value: language_name_fr,
              label: language_name_fr
            }))}
            className='meet-select'
            placeholder={englishMode ? 'Languages' : 'Langues'}
            isMulti
            autoFocus
            isSearchable
            noOptionsMessage={() =>
              {englishMode ? 'All languages are already selected' : 'Toutes les langues sont déja sélectionnées'}
            }
          />
        </div>
      </nav>
      <GreetersPaginationFiltered
        selectedOptionsCity={selectedOptionsCity}
        selectedOptionsThem={selectedOptionsThem}
        selectedOptionsLang={selectedOptionsLang}
      />
    </>
  )
}

export default MeetGreeterBar
