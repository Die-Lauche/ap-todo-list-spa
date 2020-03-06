const state = {
  lists: [],
  todos: [],
  currentList: {}
}

const getters = {
  lists: state => state.lists,
  todos: state => state.todos,
  currentList: state => state.currentList,
  todosCompleted: state => state.todos.filter(item => item.isCompleted === true),
  todosProgressing: state => state.todos.filter(item => item.isInProgress === true),
  todosTodo: state => state.todos.filter(item => item.isInTodo === true)
}

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
  setTodos (state, todos) {
    state.todos = todos.slice()
  },
  setCurrentList (state, listId) {
    state.currentList = state.lists.find(item => item.id === listId) || {}
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
  // Send an api call to set the todo undone
  async setUndone (context, todoId) {
    try {
      const response = await fetch(`/api/todo/${todoId}`, {
        method: 'patch',
        body: JSON.stringify({
          completed: false
        })
      })
      const data = await response.json()
      // Set the todo undone
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
      context.commit('setTodo', data.todo)
    } catch (error) {
      console.error(error)
    }
  },
  // Load the todo lists for the currently logged in user
  async loadForUser (context, userId) {
    try {
      // const response = await fetch(`/listForUser?userId=${userId}`)
      const response = await fetch('http://localhost:5000/request/todoList.json')
      const data = await response.json()
      context.commit('setLists', data)
    } catch (error) {
      console.error(error)
      context.commit('setLists', [])
    }
  },
  async getListTodos (context, listId) {
    try {
      // const response = await fetch(`/todosForList?listId=${listId}`)
      const response = await fetch('http://localhost:5000/request/todos.json')
      const data = await response.json()
      context.commit('setTodos', data)
    } catch (error) {
      console.error(error)
      context.commit('setTodos', [])
    }
  },
  // Set the current list for use in the todos detail page
  setCurrentList (context, listId) {
    context.commit('setCurrentList', listId)
    context.dispatch('getListTodos', listId)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
