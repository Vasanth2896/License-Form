import React from 'react';
import { Button, TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const SearchBox = (props) => {
    const { handleSearchInputchange, searchInput, history, onCancel } = props

    return (
        <div className='searchbarContainer'>
            <div>
                <TextField
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    type='search'
                    variant='outlined'
                    onChange={(e) => handleSearchInputchange(e)}
                    value={searchInput || ''}
                />
            </div>
            <div>
                <Button
                    color='primary'
                    variant='contained'
                    style={{ textTransform: 'unset' }}
                    onClick={() => {
                        history.push('/layout/PersonalDetails');
                        onCancel();
                    }}
                >+ New User</Button>
            </div>
        </div>

    )

}

export default SearchBox;