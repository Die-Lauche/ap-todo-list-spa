<template>
  <div class="todo-list">
    <router-link :to="{ name: 'details', params: { listId: list.id }}">
      <h1>{{ list.title }}</h1>
    </router-link>
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
    // todos () {
    //   return this.todosForList(this.list.id)
    // }
  },
  methods: {
    addTodo () {
      console.log(this.todoText)
      // Call action to add a new todo to the list
      this.$store.dispatch('ToDos/addTodo', [this.list.id, this.todoText])
      this.todoText = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.h1, h1 {
  font-size: 32px;
}

.todo-list {
  display: inline-block;

  .list-title {
    text-decoration: none;
  }
}

</style>
