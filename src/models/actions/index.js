export const sendPost = post => ({
    type: 'SEND_POST',
    posts: [post]
})

export const loadPosts = posts => ({
    type: 'LOAD_POSTS',
    posts
})
