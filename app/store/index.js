/* eslint-disable no-console */
import moment from '@/plugins/moment'

export const state = () => ({
  isLoggedIn: false,
  user: null
})

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  user: state => {
    console.log(
      'getters state',
      state.user ? { likes: [], ...state.user } : null
    )
    return state.user ? { likes: [], ...state.user } : null
  }
}

export const mutations = {
  setUser(state, payload) {
    const { user } = payload
    state.user = user
    state.isLoggedIn = true
  }
}

export const actions = {
  async login({ commit }, payload) {
    const { id } = payload
    const user = await this.$axios.$get(`/users/${id}.json`)

    if (!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  },

  async register({ commit }, payload) {
    const { id } = payload
    await this.$axios.$patch('/users.json', { [id]: payload })
    const user = await this.$axios.$get(`/users/${payload.id}.json`)

    if (!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  },

  async addLikeLogToUser({ commit }, payload) {
    const { user, post } = payload

    user.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })

    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    commit('setUser', { user: newUser })
  }
}
