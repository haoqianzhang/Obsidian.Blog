import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, Avatar, IconButton } from '@material-ui/core'
import avatar_placeholder from 'assets/avatar-placeholder.svg'
import editIcon from 'assets/edit-button.svg'

import { HOME } from 'config'

const styles = {
    navbar: {
        height: 80,
        backgroundColor: 'white',
        boxShadow: 'none',
    },
    toolbar: {
        height: 80,
        justifyContent: 'space-between'
    },
    name: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        paddingRight: 15,
        paddingLeft: 15,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: 38,
        fontWeight: 700,
        color: 'black',
        letterSpacing: 8,
    },
    pullRight: {
        position: 'absolute',
        right: 30,
    }
}


class Navbar extends Component {
    state = {
        menuAnchor: null,
    }
    
    handleEditClick = () => {
        this.props.history.push('/publish/')
    }

    render() {
        const { classes } = this.props
        const { menuAnchor } = this.state
        return (
            <AppBar className={classes.navbar} position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Link to={HOME} className={classes.title}>
                        Obsidian
                    </Link>
                    <div className={classes.pullRight}>
                        <IconButton onClick={this.handleEditClick}>
                            <img src={editIcon} alt="Edit" width="20"/>
                        </IconButton>
                        <IconButton 
                            aria-owns={menuAnchor ? 'user-menu' : null}
                            aria-haspopup="true"
                            // onClick={this.handleAvatarClick}
                        >
                            <Avatar src={avatar_placeholder} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(withStyles(styles)(Navbar))
