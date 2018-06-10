import APIClient from './APIClient'
import { ReduxStore } from '.'
import { loadPosts } from './actions'

var store = null

class GlobalStore {
    posts = {}
    replies = {}
    categories = {}

    reloadData() {
        APIClient.posts().then(response => {
            response.rows.forEach(item => {
                if (item.post_id !== -1) {
                    if (!store.replies[item.post_id]) {
                        store.replies[item.post_id] = [item]
                    } else {
                        store.replies[item.post_id].push(item)
                    }
                } else {
                    store.posts[item.id] = item
                }
                if (item.category.length > 0) {
                    if (!store.categories[item.category]) {
                        store.categories[item.category] = [item]
                    } else {
                        store.categories[item.category].push(item)
                    }
                }
            })
            ReduxStore.dispatch(loadPosts(store.posts))
            console.log(store)
        }).catch(error => {
            console.error(error)
        })
    }
}

store = new GlobalStore()
export default store