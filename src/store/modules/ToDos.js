const state = {
  lists: [],
  todos: []
}

const getters = {
  lists: state => state.lists,
  todos: state => state.todos,
  todosForList: state => id => state.todos.filter(item => item.todo_list_id === id)
}

const mutations = {
  done (state, id) { state.todos.filter(item => item.id === id)[0].completed = true },
  undone (state, id) { state.todos.filter(item => item.id === id)[0].completed = false },
  add (state, todoData) {
    state.todos.push({ id: 100, todo_list_id: todoData[0], content: todoData[1], completed: false })
  },
  setLists (state, lists) {
    state.lists = lists
  }
}

const actions = {
  // Set the todo done
  async setDone (context, todoId) {
    // TODO: Send API call
    try {
      const response = await fetch(`/api/todos/${todoId}`)
      const data = await response.json()
      context.commit('done', data.todo) // change locally (mutate)
    } catch (error) {
      console.error(error)
      alert('Something went wrong while setting the state of the todo!') // TODO: Change the error message
    }
  },
  // Set the todo undone
  setUndone (context, id) {
    // TODO: Send API call
    context.commit('undone', id) // change locally (mutate)
  },
  // Add a new todo to the specified list (todoData contains [0] = the list id, [1] = the text)
  addTodo (context, todoData) {
    context.commit('add', todoData)
  },
  // Load the todo lists for the currently logged in user
  async loadForUser (context, userId) {
    try {
      const response = await fetch(`/api/lists/${userId}`)
      const data = await response.json()
      context.commit('setLists', data.lists)
    } catch (error) {
      console.error(error)
      context.commit('setLists', [])
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
