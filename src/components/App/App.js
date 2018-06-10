import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Post, PostList, Publish } from 'components/Post'
import { FixedSpace } from 'components/Utils'
import Navbar from './Navbar'

import { GlobalStore } from 'models'


class App extends Component {
    componentDidMount() {
        GlobalStore.reloadData()
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
