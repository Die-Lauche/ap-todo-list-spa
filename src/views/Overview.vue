<template>
    <div id="overview">
        <todo-list v-for="list in lists" :key="list.id" :list="list" />
        <form @submit.prevent="addNewList">
          <input type="text" placeholder="New list" />
          <button type="submit">Add new list</button>
        </form>

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
      this.$store.dispatch('ToDos/createNewList', this.userId)
    }
  }
}
</script>

<style lang="scss" scoped>
// Scoped Styles only for this view
#overview {
  border-top: 1px solid #E0E0E0;
}
</style>
