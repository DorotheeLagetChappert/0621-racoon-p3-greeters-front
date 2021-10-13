import React from 'react'

import './GreeterProfilCard.css'

const GreeterProfilCard = props => {
  return (
    <div className='greeter-profil-bloc-card' aos-data='fade-right'>
      <img
        src={props.result[0].person_photo}
        alt={props.result[0].person_firstname}
        className='greeter-profil-bloc-card-img'
      />
      <h3 className='greeter-profil-bloc-info-catchphrase'>
        {props.result[0].person_catch_phrase_fr}
      </h3>
      <a
        href='https://gestion.greeters.fr/visits/new'
        target='_blank'
        rel='noreferrer'
      >
        <button className='greeter-profil-bloc-card-btn'>
          Réservez votre balade
        </button>
      </a>
    </div>
  )
}

export default GreeterProfilCard
