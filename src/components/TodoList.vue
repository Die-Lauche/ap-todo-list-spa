<template>
  <router-link :to="{ name: 'details', params: { listId: list.id }}" class="col-lg-4 project-link">
    <div class="todo-list">
      <div class="h1 list-title">
        {{ list.title }}
      </div>
    </div>
  </router-link>
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

.project-link {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.todo-list {
  display: inline-block;
  padding: 12px;

  .list-title {
    color: #1E1E1E;
    font-size: 16px;
  }
}

</style>
