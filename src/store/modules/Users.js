const state = {
  user: null,
  error: null
}

const getters = {
  user: state => state.user,
  authenticated: state => !!state.user // False if user is not logged in
}

const mutations = {
  setUser (state, user) { state.user = user; console.log('setUser', user) },
  setError (state, error) { state.error = error }
}

const actions = {
  // Do login, check if the entered credentials are correct with a call to the api
  async login (context, credentials) {
    try {
      const response = await fetch('http://localhost:5000/request/user.json', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      if (data) {
        context.dispatch('setUser', data)
        return true
      }
    } catch (error) {
      context.commit('setError', error)
      console.log('Hier', error)
      return false
    }
  },
  // Registrate the user and dispatch the mutation to change the state of the user when successfully registrated
  async registration (context, credentials) {
    try {
      const response = await fetch('https://ap-todo-list.herokuapp.com/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.user) {
        context.dispatch('setUser', data.user)
        return true
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      context.commit('setError', error)
      return false
    }
  },
  setUser (context, user) {
    context.commit('setUser', user)
    context.commit('setError', null)
    sessionStorage.setItem('user', JSON.stringify(user))
    context.dispatch('ToDos/loadForUser', user.id, { root: true })
  },
  logout (context) {
    context.commit('setUser', null)
    context.commit('setError', null)
    sessionStorage.removeItem('user')
    context.dispatch('ToDos/clear', null, { root: true })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
