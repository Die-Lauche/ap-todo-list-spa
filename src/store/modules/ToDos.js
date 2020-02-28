const state = {
  lists: []
}

const getters = {
  lists: state => state.lists
}

// Mutations for changing the state.
// The state should only be modified through mutations and not through actions.
const mutations = {
  setTodoStatus (state, [todo, status]) {
    state.lists.some(list => {
      const localTodo = list.todos.find(item => item.id === todo.id)
      if (localTodo) {
        localTodo.completed = status
        return true
      }
    })
  },
  add (state, todoData) {
    state.todos.push({ id: 100, todo_list_id: todoData[0], content: todoData[1], completed: false })
  },
  setLists (state, lists) {
    state.lists = lists
  },
  setTodo (state, data) {
    state.lists.find(item => item.id === data.listId).todos.push(data)
  }
}

const actions = {
  // Set the todo done
  async setDone (context, todoId) {
    try {
      const response = await fetch(`/api/todo/${todoId}`, {
        method: 'patch',
        body: JSON.stringify({
          completed: true
        })
      })
      const data = await response.json()
      context.commit('setTodoStatus', [data.todo, true])
    } catch (error) {
      console.error(error)
      alert('Something went wrong while setting the state of the todo!') // TODO: Change the error message
    }
  },
  async setUndone (context, todoId) {
    try {
      const response = await fetch(`/api/todo/${todoId}`, {
        method: 'patch',
        body: JSON.stringify({
          completed: false
        })
      })
      const data = await response.json()
      context.commit('setTodoStatus', [data.todo, false])
    } catch (error) {
      console.error(error)
      alert('Something went wrong while setting the state of the todo!') // TODO: Change the error message
    }
  },
  createNewList (context, userId) {
    // TODO add new list to the user
  },
  // Add a new todo to the specified list (todoData contains [0] = the list id, [1] = the text)
  async addTodo (context, [listId, content]) {
    try {
      // Send the new todo content to the api so it can be added to the db
      // We already get the listid through the params so no need to add it to the body
      const response = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify({ listId, content })
      })
      const data = await response.json()
      console.log(data.todo)
      context.commit('setTodo', data.todo)
    } catch (error) {
      console.error(error)
    }
  },
  // Load the todo lists for the currently logged in user
  async loadForUser (context, userId) {
    try {
      const response = await fetch(`/api/listForUser/${userId}`)
      const data = await response.json()
      context.commit('setLists', data.lists)
    } catch (error) {
      // Log any error and set the lists empty
      console.error(error)
      context.commit('setLists', [])
    }
  },
  clear (context) {
    context.commit('setLists', [])
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
