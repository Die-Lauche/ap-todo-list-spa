<template>
  <li>
    <span :class="itemClass">{{ todo.content }}</span>
    <button @click="toggleCompletion">x</button>
  </li>
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
  border-radius: 5px;
}
</style>
