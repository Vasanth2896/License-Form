import React from 'react';
import { AppBar,Toolbar,Typography } from "@material-ui/core";

const Navbar = () => {

    return (
        <div>
            <AppBar position='static' style={{ backgroundColor: 'blue' }}>
                <Toolbar>
                    <Typography variant="h6" >
                        License Management
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;