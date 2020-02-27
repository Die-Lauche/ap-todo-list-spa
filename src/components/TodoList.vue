<template>
  <div class="todo_list">
    <h1>{{ list.title }}</h1>
    <ul>
      <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="todoText" placeholder="New todo" />
    </form>
  </div>
</template>

<script>
import TodoItem from '../components/TodoItem'

export default {
  components: { TodoItem },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      todoText: ''
    }
  },
  computed: {
    todos () {
      return this.$store.getters['ToDos/todosForList'](this.list.id)
    }
  },
  methods: {
    addTodo () {
      console.log(this.todoText)
      // Call action
      this.$store.dispatch('ToDos/addTodo', [this.list.id, this.todoText])
      this.todoText = ''
    }
  }
}
</script>
