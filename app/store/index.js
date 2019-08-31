export const state = () => ({
  isLoggedIn: false,
  user: null
})

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  user: state => state.user
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
  }
}
