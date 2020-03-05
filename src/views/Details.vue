<template>
    <div id="detail-overview">
      <div class="wrapper">
        <router-link :to="'overview'">
          <unicon class="arrow-left" name="arrow-left" fill="#1E1E1E"></unicon>
        </router-link>
        <h1>{{ getCurrentList.title }}</h1>
        <div class="lane lane-todo">
          <div class="lane-headline">ToDo</div>
          <div class="row">
            <todo-item v-for="todo in getTodosFromStore.isInTodo" :key="todo.id" :todo="todo" />
          </div>
        </div>
        <div class="lane lane-progress">
          <div class="lane-headline">In progress</div>
          <div class="row">
            <todo-item v-for="todo in getTodosFromStore.isInProgress" :key="todo.id" :todo="todo" />
          </div>
        </div>
        <div class="lane lane-completed">
          <div class="lane-headline">Completed</div>
          <div class="row">
            <todo-item v-for="todo in getTodosFromStore.isCompleted" :key="todo.id" :todo="todo" />
          </div>
        </div>
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
#detail-overview {
  border-top: 1px solid #E0E0E0;
}

.wrapper {
  max-width: 950px;
  margin: 0 auto;
}

.lane-headline {
  color: #ABBCC9;
}

.lane {
  padding: 10px;
  background-color: #F3F5F6;
  border-radius: 8px;
} 
</style>
