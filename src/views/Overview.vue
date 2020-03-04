<template>
    <div id="overview">
        <!-- <todo-list v-for="list in lists" :key="list.id" :list="list" /> -->
        <div class="lists" v-for="list in lists" :key="list.id" :list="list">
          <router-link :to="{ name: 'details', params: { listId: list.id }}">
            <div class="list-title h1">{{ list.title }}</div>
          </router-link>
        </div>
        <form @submit.prevent="addNewList">
          <input type="text" placeholder="New list" />
          <button type="submit" class="btn">Add new list</button>
        </form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import TodoList from '../components/TodoList'

export default {
  components: { },
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

.h1, h1 {
  font-size: 32px;
}

.lists {
  display: inline-block;

  .list-title {
    text-decoration: none;
  }
}

</style>
