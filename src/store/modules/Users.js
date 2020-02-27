const state = {
  user: null,
  error: null
}

const getters = {
  user: state => state.user,
  authenticated: state => state.user !== null // False if user is not logged in
}

const mutations = {
  setUser (state, user) { state.user = user },
  setError (state, error) { state.error = error }
}

const actions = {
  // Do login
  async login (context, credentials) {
    try {
      const response = await fetch('/api/login', {
        method: 'post',
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      if (data.user) {
        context.commit('setUser', data.user)
        context.commit('setError', null)
        context.dispatch('ToDos/loadForUser', data.user.id, { root: true })
        return true
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      context.commit('setError', error)
      return false
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
