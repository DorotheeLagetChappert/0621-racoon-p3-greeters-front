import axios from 'axios'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useParams } from 'react-router'

// Import icons
import pointer2 from '../../assets/map/pointer2.png'

import './Map.css'

const MapComponent = () => {
  const { idGreeter } = useParams()

  console.log(idGreeter)

  const [cityDB, setCityDB] = useState()

  const getGreeterData = async () => {
    const resGreeterData = await axios.get('http://localhost:3000/city')
    setCityDB(resGreeterData.data)
    console.log('liste city :')
    console.log(resGreeterData.data)
  }

  const getCityData = async () => {
    const resCityData = await axios.get('http://localhost:3000/city')
    setCityDB(resCityData.data)
    console.log('liste city :')
    console.log(resCityData.data)
  }

  useEffect(() => {
    if (idGreeter) {
      getGreeterData()
    } else {
      getCityData()
    }
  }, [])

  // Static data for home map
  const city = [
    {
      name: 'Tours',
      cordonates: [47.39, 0.68],
      icon: {
        lat: 47.39,
        lng: 0.68
      }
    },
    {
      name: 'Chinon',
      cordonates: [47.1, 0.14],
      icon: {
        lat: 47.1,
        lng: 0.14
      }
    },
    {
      name: 'Jouè-lés-Tours',
      cordonates: [47.35, 0.66],
      icon: {
        lat: 47.35,
        lng: 0.66
      }
    },
    {
      name: 'Amboise',
      cordonates: [47.4132, 0.986012],
      icon: {
        lat: 47.4132,
        lng: 0.986012
      }
    }
  ]

  const redIcon = L.icon({
    iconUrl: pointer2, // image red
    iconSize: [50, 40], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -86]
  })

  return (
    <div className='MapComponent' data-aos='fade-down'>
      {/* Using the map module */}
      {/*
      {cityDB && (
        <MapContainer
          className='map'
          center={[cityDB[0].city_longitude, cityDB[0].city_latitude]} //coordinates ? coordinates :
          zoom={8}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {
            /*coordinates ? (
          <Marker
            position={[coordinates.position[0], coordinates.position[1]]}
            icon={redIcon}
          >
            <Popup>{coordinates.name}</Popup>
          </Marker>
        ) : (* /
            cityDB.map((element, index) => (
              <Marker
                key={index}
                position={[element.city_longitude, element.city_latitude]}
                icon={redIcon}
              >
                <Popup>{element.city_name}</Popup>
              </Marker>
            ))
            // )}
          }
        </MapContainer>
      )}
        */}
    </div>
  )
}

export default MapComponent
