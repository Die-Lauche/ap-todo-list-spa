<template>
  <div class="todo_list">
    <a href="" @click.prevent="showListDetail">
      <h1>{{ list.title }}</h1>
    </a>
  </div>
</template>

<script>
// import TodoItem from '../components/TodoItem'

export default {
  components: { },
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
    // Return the todos from a specified list
    todos () {
      return this.$store.getters['ToDos/todosForList'](this.list.id)
    }
  },
  methods: {
    addTodo () {
      console.log(this.todoText)
      // Call action to add a new todo to the list
      this.$store.dispatch('ToDos/addTodo', [this.list.id, this.todoText])
      this.todoText = ''
    },
    showListDetail (context) {
      console.log(this.list)
    }
  }
}
</script>
