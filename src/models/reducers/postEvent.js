import GlobalStore from '../GlobalStore'

const postEvent = (state = GlobalStore.posts, action) => {
    switch (action.type) {
    case 'SEND_POST':
        return action.posts
    case 'LOAD_POSTS':
        return action.posts
    default:
        return state
    }
}

export default postEvent