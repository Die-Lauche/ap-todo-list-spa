<template>
  <div class="col-lg-4">
    <router-link :to="{ name: 'details', params: { listId: list.id }}" class="project-link middle-xs">
      <div class="todo-list">
        <div class="h1 list-title">
          {{ list.title }}
        </div>
      </div>
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
  }
}
</script>

<style lang="scss" scoped>

.project-link {
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.todo-list {
  display: inline-block;
  padding: 16px;

  .list-title {
    color: #1E1E1E;
    font-size: 16px;
    margin-bottom: 0;
  }
}

</style>
