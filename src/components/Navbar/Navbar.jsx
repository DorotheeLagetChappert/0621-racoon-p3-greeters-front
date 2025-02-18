import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Aos from 'aos'
import Swal from 'sweetalert2'

import { LangueContext } from '../../context/langueContext'
import logo from '../../assets/greeters-logo-red.PNG'
import SearchBar from '../SearchBar/SearchBar'

import 'aos/dist/aos.css'
import './Navbar.css'

const Navbar = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])
  /***** Language selection */
  const [language, setLanguage] = useState('fr')

  const handleLanguage = choice => {
    setLanguage(choice)
    language === 'fr'
      ? Swal.fire('Language changed to English')
      : Swal.fire('Langue changée en Français')
  }

  /***** constants for toggle language fr to en */

  const langue = useContext(LangueContext)

  const handleClick = () => {
    langue.dispatch({ type: 'TOGGLE' })
  }

  /***** Search bar */
  const [searchBar, setSearchBar] = useState(false)

  const handleSearchBar = () => {
    setSearchBar(!searchBar)
  }
  /***** Search value */
  const [searchValue, setSearchValue] = useState('')

  /***** Menu */
  const [showMenu, setShowMenu] = useState(false)

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className='Navbar' data-aos='fade-down'>
      {/* Fixed Menu */}
      <div className='nav-close'>
        <div className='logo-element'>
          <NavLink to='/'>
            <img src={logo} alt='logo' />
          </NavLink>
        </div>
        <div className='nav-element'>
          <div
            className={
              showMenu
                ? 'toggle-button toHide-button'
                : 'toggle-button toShow-button'
            }
            onClick={() => handleShowMenu()}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className='nav-element'>
          <div className='nav-sub-element'>
            {/* searchBar */}
            {searchBar && (
              <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            )}

            <button onClick={handleSearchBar}>&#128270;</button>
            <select
              /* onClick={handleClick} */
              className='language-button'
              onChange={e => {
                handleLanguage(e.target.value)
                handleClick()
              }}
            >
              <option value='fr'>🇫🇷</option>
              <option value='en'>🇬🇧</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Menu */}

      <div
        className={showMenu ? 'nav-open toShow-menu' : 'nav-open toHide-menu'}
      >
        <a href='/concept' alt=''>
          <h3>Qu'est ce qu'un greeter ?</h3>
        </a>

        <a href='/meetgreeter' alt=''>
          <h3>Rencontrer un greeter</h3>
        </a>

        <a
          href='https://greeters.fr/destinations-france/'
          alt=''
          target='_blank'
          rel='noreferrer'
          noreferrer
        >
          <h3>Réserver une balade</h3>
        </a>

        <a href='/contact' alt=''>
          <h3>Nous contacter</h3>
        </a>
      </div>
    </div>
  )
}

export default Navbar
