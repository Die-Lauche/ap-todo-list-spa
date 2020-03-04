<template>
    <div id="overview">
        <h1>{{ getCurrentList.title }}</h1>
        <div class="lane-todo">
            <todo-item v-for="todo in getTodosFromStore.isInTodo" :key="todo.id" :todo="todo" />
        </div>
        <div class="lane-progress">
            <todo-item v-for="todo in getTodosFromStore.isInProgress" :key="todo.id" :todo="todo" />
        </div>
        <div class="lane-completed">
            <todo-item v-for="todo in getTodosFromStore.isCompleted" :key="todo.id" :todo="todo" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoItem from '../components/TodoItem'

export default {
  components: { TodoItem },
  computed: {
    ...mapGetters('ToDos', ['todos', 'currentList']),
    // Return the todos
    getTodosFromStore () {
      return this.todos
    },
    getCurrentList () {
      return this.currentList
    }
  },
  created () {
    this.$store.dispatch('ToDos/setCurrentList', this.$route.params.listId)
    this.$store.dispatch('ToDos/getListTodos', this.$route.params.listId)
  }
}
</script>

<style lang="scss" scoped>
// Scoped Styles only for this view
#overview {
  border-top: 1px solid #E0E0E0;
}
</style>
