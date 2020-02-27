const state = {
  lists: [],
  todos: [
    { id: 1, todo_list_id: 1, content: 'ToDo 1', completed: false },
    { id: 2, todo_list_id: 1, content: 'ToDo 2', completed: false },
    { id: 3, todo_list_id: 1, content: 'ToDo 3', completed: false },
    { id: 4, todo_list_id: 2, content: 'ToDo 4', completed: false },
    { id: 5, todo_list_id: 2, content: 'ToDo 5', completed: false }
  ]
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
  // TODO Add the update/delete/create actions/mutations
  // Set the todo done
  setDone (context, id) {
    // TODO: Update in DB
    context.commit('done', id) // change locally (mutate)
  },
  // Set the todo undone
  setUndone (context, id) {
    // TODO: Update in DB
    context.commit('undone', id) // change locally (mutate)
  },
  // Add a new todo to the specified list (todoData contains [0] = the list id, [1] = the text)
  addTodo (context, todoData) {
    context.commit('add', todoData)
  },
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
