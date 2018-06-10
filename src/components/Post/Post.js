import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FixedSpace, Line } from '../Utils'
import ReactMarkdown from 'react-markdown'
// import { testContent } from './test-content'
import Comment from './Comment'
import Reply from './Reply'
import { GlobalStore, ReduxStore } from 'models'
import { formatDate } from 'tools'

import { IMAGE_HOST } from 'config'

const styles = {
    image: {
        width: '100%',
    },
    headline: {
        fontSize: 15,
        color: 'gray',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        lineHeight: 1.2,
    },
    subtitle: {
        fontSize: 12,
    },
    content: {
        lineHeight: 2,
        fontSize: 14,
        width: '100%',
    },
    heading: {
        position: 'relative',
    },
    date: {
        position: 'absolute',
        bottom: 0,
    }
}

class Post extends Component {
    state = {
        post: null
    }

    componentWillMount() {
        this.setState({post: GlobalStore.posts[this.props.match.params.id]})
        
        this.unsubscribe = ReduxStore.subscribe(() => {
            this.setState({post: GlobalStore.posts[this.props.match.params.id]})
            this.reloadHighlight()
        })
    }

    componentDidMount() {
        this.reloadHighlight()
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    reloadHighlight = () => {
        const items = document
            .getElementById('post-content')
            .getElementsByTagName('pre')
        for (let item of items) {
            window.hljs.highlightBlock(item)
        }
    }

    render() {
        const { classes } = this.props
        const { post } = this.state
        if (!post) {
            return (<div id="post-content"></div>)
        }
        let comments = []
        if (post) {
            comments = GlobalStore.replies[post.id] ? GlobalStore.replies[post.id] : []
        }
        console.log(post)
        return (
            <Grid container justify="center">
                <Grid item xs={10} lg={8} xl={6}>
                    <Grid container>
                        <Grid item xs={6} className={classes.heading}>
                            <Typography className={classes.headline}>{post.category}</Typography>
                            <FixedSpace size="sm"/>
                            <Typography className={classes.title}>{post.title}</Typography>
                            <Typography className={classes.subtitle}>{post.subtitle}</Typography>
                            <Typography className={classes.date}>{formatDate(post.date)}</Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                            <img className={classes.image} src={IMAGE_HOST + post.image} alt=""/>
                        </Grid>
                    </Grid>
                    <FixedSpace size="sm"/>
                    <Line />
                    <FixedSpace size="sm"/>
                    <Grid container id="post-content">
                        <ReactMarkdown source={post.content} className={classes.content}/>
                    </Grid>
                    <FixedSpace size="sm" />
                    <Line />
                    {comments.map((item, index) => {
                        return (<Comment post={item} key={index}/>)
                    })}
                    <Line />
                    <FixedSpace size="sm" />

                    <Reply postId={this.props.match.params.id}/>

                    <FixedSpace size="xl" />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Post)