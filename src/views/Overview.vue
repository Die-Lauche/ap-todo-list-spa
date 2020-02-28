<template>
    <div id="overview">
        <todo-list v-for="list in lists" :key="list.id" :list="list" />
        <button :click="addNewList">Add new list</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from '../components/TodoList'

export default {
  components: { TodoList },
  computed: {
    ...mapGetters('ToDos', ['lists'])
  },
  methods: {
    // Add a new list to the user
    addNewList () {
      // this.$store.dispatch('ToDos/createNewList', this.userId)
    }
  }
}
</script>

<style>
</style>
