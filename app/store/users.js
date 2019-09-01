/* eslint-disable no-console */
export const state = () => ({
  users: []
})

export const getters = {
  users(state) {
    return state.users
  }
}

export const mutations = {
  addUser(state, payload) {
    const { user } = payload
    state.users.push(user)
  },

  addUserPost(state, payload) {
    const { user, post } = payload
    state.userPosts[user.id].push(post)
  },

  cleanUserPost(state, payload) {
    const { user } = payload
    state.userPosts[user.id] = []
  }
}

export const actions = {
  async fetchUser({ commit }, payload) {
    const { id } = payload
    const user = await this.$axios.$get(`/users/${id}.json`)
    commit('addUser', { user })
  }
}
