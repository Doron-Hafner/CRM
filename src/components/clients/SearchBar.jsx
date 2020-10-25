import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';

const SearchBar = inject("ClientsStore")(observer((props) => {
    const [state, setState] = useState({
        searchInput: '',
        searchType: 'name'
    })
    const handleChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        setState({...state, [name]: value})
        props.filter(state.searchType, state.searchInput)
    }
    
    return (
        <div style={{display:'contents'}}>
              <Input placeholder='Search' type='text' value={state.searchInput} name='searchInput' onChange={handleChange}></Input>
              <div>
              <InputLabel>Search By</InputLabel>
              <Select 
                value={state.searchType}
                name='searchType'
                onChange={handleChange}
                style={{minWidth:150, marginTop:'4px'}}
                >
                <MenuItem value='name'>Name</MenuItem>
                <MenuItem value='sold'>Sold</MenuItem>
                <MenuItem value='email_type'>Email</MenuItem>
                <MenuItem value='owner'>Owner</MenuItem>
                <MenuItem value='country'>Country</MenuItem>
              </Select>
              </div>
        </div>
    )
}))

export default SearchBar
