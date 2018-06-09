import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Post, PostList, Publish } from 'components/Post'
import { FixedSpace } from 'components/Utils'
import Navbar from './Navbar'

import { APIClient, GlobalStore, ReduxStore } from 'models'
import { loadPosts } from 'models/actions'


class App extends Component {
    componentDidMount() {
        APIClient.posts().then(response => {
            this.setState({ posts: response.rows })
            this.state.posts.forEach(item => {
                if (item.post_id !== -1) {
                    if (!GlobalStore.replies[item.post_id]) {
                        GlobalStore.replies[item.post_id] = [item]
                    } else {
                        GlobalStore.replies[item.post_id].push(item)
                    }
                } else {
                    GlobalStore.posts[item.id] = item
                }
                if (item.category.length > 0) {
                    if (!GlobalStore.categories[item.category]) {
                        GlobalStore.categories[item.category] = [item]
                    } else {
                        GlobalStore.categories[item.category].push(item)
                    }
                }
            })
            ReduxStore.dispatch(loadPosts(GlobalStore.posts))
            console.log(GlobalStore)
        }).catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <div className="app">
                <Navbar />
                <FixedSpace size="xl2"/>
                <Route exact path="/" component={PostList}/>
                <Route exact path="/post/:id" component={Post}/>
                <Route exact path="/publish/" component={Publish}/>
            </div>
        )
    }
}

export default App
