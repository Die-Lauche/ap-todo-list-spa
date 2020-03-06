<template>
  <div class="todo-item col-xs-12">
    <span :class="itemClass">{{ todo.content }}</span>
    <button @click="toggleCompletion">
      x
    </button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemClass () {
      return this.todo.completed ? 'complete' : ''
    }
  },
  methods: {
    // Call the action to toggle the completed state on the current todo
    toggleCompletion () {
      if (this.todo.completed) {
        this.$store.dispatch('ToDos/setUndone', this.todo.id)
      } else {
        this.$store.dispatch('ToDos/setDone', this.todo.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.complete {
  text-decoration: line-through;
}

button {
  border: 1px solid #999;
  border-radius: 8px;
}

li {
  list-style-type: none;
}

.todo-item {
  font-family: Lato;
  font-weight: 700;
  background: #fff;
  padding: 14px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin: 5px 0;
}
</style>
