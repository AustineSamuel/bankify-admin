import React from 'react'
import {Search} from 'react-feather'
import {MDBInput} from 'mdb-react-ui-kit'
const SearchUsers=({onChange})=>{
    return (
        <div style={{padding:20}}>
        <div className='searchContainer d-flex align-items-center'>
<MDBInput label='Search Aa...' placeholder='Search Users' onChange={onChange} type='search'/>
<Search/>
            </div></div>
    )
}

export default SearchUsers;