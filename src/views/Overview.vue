<template>
    <div id="overview">
        <todo-list v-for="list in lists" :key="list.id" :list="list" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from '../components/TodoList'

export default {
  components: { TodoList },
  computed: {
    ...mapGetters('ToDos', ['lists'])
  }
}
</script>

<style>
</style>
