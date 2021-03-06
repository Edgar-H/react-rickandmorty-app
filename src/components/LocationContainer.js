import React, { useState, useEffect } from 'react'
import { ResidentContainer } from './ResidentContainer'

export const LocationContainer = ({ id }) => {
    const
        BASE = 'https://rickandmortyapi.com/api',

        [location, setLocation] = useState(null),
        [locationData, setLocationData] = useState({})

    useEffect(() => {
        fetch(`${BASE}/location/${id}`)
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => {
                setLocation(data)
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [id])

    useEffect(() => {
        if (location !== null) {
            const
                name = location.name,
                type = location.type,
                dimension = location.dimension,
                total_residents = location.residents.length,
                residents = location.residents.map(resident => resident).slice(0, 10)

            const
                getLocationData = { name, type, dimension, total_residents, residents }

            setLocationData(getLocationData)
        }
    }, [location])

    const
        { name, type, dimension, total_residents, residents } = locationData,

        isResidents = residents !== undefined ? true : false

    return (
        <>
            <div>
                <h2>{name}</h2>
                <h2>{type}</h2>
                <h2>{dimension}</h2>
                <h2>{total_residents}</h2>
            </div>
            { isResidents &&
                residents.map((resident, index) => {
                    return (
                        <ResidentContainer
                            key={index + 1}
                            url={resident}
                        />
                    )
                })
            }
        </>
    )
}