import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Avatar, Typography } from '@material-ui/core'

import { FixedSpace } from '../Utils'

import { formatTime } from 'tools'

import md5 from 'md5'

const styles = {
    avatar: {
        display: 'flex',
        justifyContent: 'center',
    }
}

class Comment extends Component {
    render() {
        const { classes, post } = this.props
        const avatarHash = md5(post.email.trim().toLowerCase())
        return (
            <Grid container>
                <Grid item xs={12}><FixedSpace size="sm"/></Grid>
                <Grid item xs={1} className={classes.avatar}>
                    <Avatar src={'https://www.gravatar.com/avatar/' + avatarHash}/>
                </Grid>
                <Grid item xs={11}>
                    <Typography><strong>{post.author}</strong> · {formatTime(post.date)}</Typography>
                    <FixedSpace size="xs2"/>
                    <Typography>{post.content}</Typography>
                </Grid>
                <Grid item xs={12}><FixedSpace size="sm"/></Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Comment)