import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'


const Search = () => {

    const [state , setState ] = useState('')

    const search = () => {
        Router.push(`/en/instructor/search/${state}`) 
    }



    return (
        <div>

            <div className="dsnodi-sdjsad">
                <div className="searchbar-icon">
                <FiSearch color="#8A8A8A" size={17} onClick={() => search()} />

                </div>
                <input type="text" placeholder="Search" onChange={(e)=> setState(e.target.value)} />
            </div>
        </div>
    )
}

export default Search