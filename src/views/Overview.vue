<template>
  <div id="overview">
    <!-- <todo-list v-for="list in lists" :key="list.id" :list="list" /> -->
    <div class="project-wrapper">
      <h1>Projekte</h1>
      <div class="todo-lists row">
        <todo-list
          v-for="list in lists"
          :key="list.id"
          :list="list"
        />
      </div>
      <!-- <form @submit.prevent="addNewList">
        <input type="text" placeholder="New list" />
        <button type="submit" class="btn">Add new list</button>
      </form> -->
    </div>
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
  created () {
    console.log(this.lists)
  },
  mounted () {
    console.log(this.lists)
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

.project-wrapper {
  max-width: 950px;
  margin: 0 auto;
}
</style>
