import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PostItem from './PostItem'
import SwipeableViews from 'react-swipeable-views'
import { ReduxStore, GlobalStore } from 'models'
import { CATEGORIES } from 'config'

const styles = {
    commonButton: {
        color: '#666',
    },
    activated: {
        color: 'black',
        fontWeight: 'bold'
    }
}

class PostList extends Component {
    state = {
        index: 0,
        posts: {},
        category: CATEGORIES[0]
    }

    componentDidMount() {
        this.reloadData()
        this.unsubscribe = ReduxStore.subscribe(() => {
            this.reloadData()
        })
    }

    reloadData() {
        this.setState({posts: GlobalStore.categories})
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleCategoryChange = index => {
        this.setState({ index })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container justify="center">
                <Grid item xs={10}>
                    <Grid container justify="center">
                        {CATEGORIES.map((item, index) => {
                            return (
                                <Grid item key={index}><Button className={this.state.index === index ? classes.activated : classes.commonButton} onClick={() => this.handleCategoryChange(index)}>{item}</Button></Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <SwipeableViews enableMouseEvents index={this.state.index} onChangeIndex={this.handleCategoryChange}>
                        {(() => {
                            const posts = this.state.posts
                            let elements = []
                            CATEGORIES.forEach(item => {
                                if (posts[item]) {
                                    elements.push(
                                        <Grid container justify="space-around" key={item}>
                                            {posts[item].map((item, index) => {
                                                return (<Grid item xs={11} md={5} key={index}><PostItem post={item}/></Grid>)
                                            })}
                                        </Grid>
                                    )
                                }
                            })
                            return elements
                        })()}
                    </SwipeableViews>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(PostList)