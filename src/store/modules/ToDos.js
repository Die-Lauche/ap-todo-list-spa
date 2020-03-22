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
  todosTodo: state => state.todos.filter(item => item.isInTodo === true),
  getNewTodo: (state) => (todo) => {
    const newTodo = state.todos.find(item => item.id === todo.id)
    delete newTodo.todoList
    return newTodo
  }
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
  addNewList (state, list) {
    state.lists.push(list)
  },
  setLists (state, lists) {
    state.lists = lists
  },
  setTodos (state, todos) {
    state.todos = todos.slice()
  },
  setCurrentList (state, listId) {
    state.currentList = state.lists.find(item => item.id === listId) || {}
  },
  removeTodo (state, todo) {
    state.todos = state.todos.filter(item => item.id !== todo.id)
  },
  removeList (state, list) {
    state.lists = state.lists.filter(item => item.id !== list.id)
  }
}

const actions = {
  // Add a new todo
  async addTodo (context, todo) {
    // Prepare the todo object
    const currentList = state.currentList.id
    const todoData = { content: todo, isCompleted: false, isInProgress: false, isInTodo: true, todoList: { id: currentList } }
    // Send an api call to add the todo
    try {
      const response = await fetch('https://ap-todo-list.herokuapp.com/addTodo', {
        method: 'post',
        body: JSON.stringify(todoData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // Set the state
      const data = await response.json()
      context.commit('addNewTodo', data)
    } catch (error) {
      console.error(error)
      alert('Something went wrong while adding a new todo!') // TODO: Change the error message
    }
  },
  // Check the todo direction and set the status
  checkAndMoveToDo (context, [todo, direction]) {
    switch (direction) {
      case 'left':
        // If the todo is completed and the pressed button is left it can only get set to in progress
        if (todo.isCompleted) {
          context.commit('setTodoInProgress', todo)
          context.dispatch('sendUpdateTodo', context.getters.getNewTodo(todo))
        } else if (todo.isInProgress) {
          context.commit('setTodoTodo', todo)
          context.dispatch('sendUpdateTodo', context.getters.getNewTodo(todo))
        }
        break
      case 'right':
        if (todo.isInTodo) {
          context.commit('setTodoInProgress', todo)
          context.dispatch('sendUpdateTodo', context.getters.getNewTodo(todo))
        } else if (todo.isInProgress) {
          context.commit('setTodoCompleted', todo)
          context.dispatch('sendUpdateTodo', context.getters.getNewTodo(todo))
        }
        break
    }
  },
  // Send an api call to update the todo
  async sendUpdateTodo (context, todo) {
    console.log(todo)
    try {
      const response = await fetch('https://ap-todo-list.herokuapp.com/updateTodo', {
        method: 'PATCH',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response
    } catch (error) {
      console.error(error)
    }
  },
  async deleteTodo (context, todo) {
    try {
      const response = await fetch(`https://ap-todo-list.herokuapp.com/deleteTodo?tid=${todo.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response
      context.commit('removeTodo', todo)
    } catch (error) {
      console.error(error)
    }
  },
  async createNewList (context, [listName, user]) {
    const listData = { title: listName, user: { id: user.id } }
    try {
      const response = await fetch('https://ap-todo-list.herokuapp.com/addNewList', {
        method: 'POST',
        body: JSON.stringify(listData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      context.commit('addNewList', data)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteList (context, list) {
    console.log(list)
    try {
      const response = await fetch(`https://ap-todo-list.herokuapp.com/deleteTodoList?listid=${list.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response
      context.commit('removeList', list)
    } catch (error) {
      console.error(error)
    }
  },
  // Load the todo lists for the currently logged in user
  async loadForUser (context, userId) {
    try {
      const response = await fetch(`https://ap-todo-list.herokuapp.com/getTodoList?uid=${userId}`)
      // const response = await fetch('http://localhost:5000/request/todoList.json')
      const data = await response.json()
      context.commit('setLists', data)
    } catch (error) {
      // Set the error and clear the lists.
      console.error(error)
      context.commit('setLists', [])
    }
  },
  // Get the todos for a specified listid
  async getListTodos (context, listId) {
    try {
      const response = await fetch(`https://ap-todo-list.herokuapp.com/todosForList?listId=${listId}`)
      // const response = await fetch('http://localhost:5000/request/todos.json')
      const data = await response.json()
      context.commit('setTodos', data)
    } catch (error) {
      // Set the error and clear the todos.
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
