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
  // A setter for each state because we need to set each value differently
  setTodoTodo (state, todo) {
    const localTodo = state.todos.find(item => item.id === todo.id)
    localTodo.isInProgress = false
    localTodo.isInTodo = true
    localTodo.isCompleted = false
  },
  setTodoInProgress (state, todo) {
    const localTodo = state.todos.find(item => item.id === todo.id)
    localTodo.isInProgress = true
    localTodo.isInTodo = false
    localTodo.isCompleted = false
  },
  setTodoCompleted (state, todo) {
    const localTodo = state.todos.find(item => item.id === todo.id)
    localTodo.isInProgress = false
    localTodo.isInTodo = false
    localTodo.isCompleted = true
  },
  addNewTodo (state, todoData) {
    state.todos.push(todoData)
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
  async addTodo (context, todo) {
    const todoData = { todo_list_id: state.currentList.listId, content: todo, isInProgress: false, isInTodo: true, isCompleted: false }
    try {
      await fetch('/', {
        method: 'post',
        body: JSON.stringify(todoData)
      })
      context.commit('addNewTodo', todoData)
    } catch (error) {
      console.error(error)
      alert('Something went wrong!') // TODO: Change the error message
    }
  },
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
  // Check the todo direction and set the status
  checkAndMoveToDo (context, [todo, direction]) {
    switch (direction) {
      case 'left':
        if (todo.isCompleted) {
          context.commit('setTodoInProgress', todo)
        } else if (todo.isInProgress) {
          context.commit('setTodoTodo', todo)
        }
        break
      case 'right':
        if (todo.isInTodo) {
          context.commit('setTodoInProgress', todo)
        } else if (todo.isInProgress) {
          context.commit('setTodoCompleted', todo)
        }
        break
    }
  },
  createNewList (context, userId) {
    // TODO add new list to the user
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
  // Get the todos for a specified listid
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
