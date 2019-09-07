/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import moment from '@/plugins/moment'

export const state = () => ({
  posts: []
})

export const getters = {
  posts: state => state.posts.map(post => ({ likes: [], ...post }))
}

export const mutations = {
  addPost(state, payload) {
    state.posts.push(payload)
  },

  updatePost(state, payload) {
    state.posts = state.posts.map(post => {
      return post.id === payload.id ? payload : post
    })
  },

  clearPosts(state) {
    state.posts = []
  }
}

export const actions = {
  async publishPost({ commit }, payload) {
    const user = await this.$axios.$get(`/users/${payload.user.id}.json`)
    // eslint-disable-next-line camelcase
    const post_id = (await this.$axios.$post(`/posts.json`, payload)).name
    // eslint-disable-next-line camelcase
    const created_at = moment().format()
    const post = { id: post_id, ...payload, created_at }
    const putData = { id: post_id, ...payload, created_at }

    delete putData.user

    await this.$axios.$put(`/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData
    ])

    commit('addPost', post)
  },

  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get('/posts.json')
    commit('clearPosts')
    const postsArray = Object.entries(posts || []).reverse()

    postsArray.forEach(([id, content]) => {
      commit('addPost', { id, ...content })
    })
  },

  async fetchPost({ commit }, payload) {
    const { id } = payload
    const post = await this.$axios.$get(`/posts/${id}.json`)
    commit('addPost', { id, ...post })
  },

  async addLikeToPost({ commit }, payload) {
    const { user, post } = payload

    post.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })

    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  }
}
