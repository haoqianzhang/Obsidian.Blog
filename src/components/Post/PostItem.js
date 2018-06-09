import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { FixedSpace } from '../Utils'
import { formatDate } from 'tools'

import { IMAGE_HOST } from 'config'

const styles = {
    item: {
        marginTop: 50,
        border: 'solid #DDD 2px',
        borderRadius: 5,
        height: 200,
        position: 'relative',
        background: 'white',
        '&:hover': {
            background: '#DDD',
            cursor: 'pointer',
        },
    },
    headline: {
        fontSize: 12,
        color: 'gray',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 1.3,
    },
    subtitle: {
        fontSize: 11,
    },
    image: {
        height: '100%',
    },
    imageContainer: {
        overflow: 'hidden',
    },
    content: {
        padding: '10px 20px',
    },
    date: {
        position: 'absolute',
        bottom: 10,
    }
}

class PostItem extends Component {
    handleClick = () => {
        this.props.history.push('/post/' + this.props.post.id)
    }

    render() {
        const { classes, post } = this.props
        return (
            <Grid container className={classes.item} onClick={this.handleClick}>
                <Grid item xs={4} className={classes.imageContainer}>
                    <img className={classes.image} src={IMAGE_HOST + post.image} alt=""/>
                </Grid>
                <Grid item xs={8} className={classes.content}>
                    <Typography className={classes.headline}>{post.category}</Typography>
                    <Typography className={classes.title}>{post.title}</Typography>
                    <FixedSpace size="xs"/>
                    <Typography className={classes.subtitle}>{post.subtitle}</Typography>
                    <Typography className={classes.date}>{formatDate(post.date)}</Typography>
                </Grid>
            </Grid>
        )
    }
}

export default  withRouter(withStyles(styles)(PostItem))