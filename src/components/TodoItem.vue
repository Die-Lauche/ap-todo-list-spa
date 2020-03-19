<template>
  <div class="todo-item col-xs-12">
    <button v-if="todo.isInProgress" class="moveToTodo" @click="changeState(todo, 'moveToTodo')">
      <unicon
        class="arrow-left"
        name="arrow-left"
        fill="#1E1E1E"
        width="20"
        height="20"
      />
    </button>
    <button v-if="todo.isCompleted" class="moveToInProgress" @click="changeState(todo, 'moveToInProgress')">
      <unicon
        class="arrow-left"
        name="arrow-left"
        fill="#1E1E1E"
        width="20"
        height="20"
      />
    </button>
    <span :class="itemClass">{{ todo.content }}</span>
    <button v-if="todo.isInTodo" class="moveToInProgress" @click="changeState(todo, 'moveToInProgress')">
      <unicon
        class="arrow-right"
        name="arrow-right"
        fill="#1E1E1E"
        width="20"
        height="20"
      />
    </button>
    <button v-if="todo.isInProgress" class="moveToDone" @click="changeState(todo, 'moveToDone')">
      <unicon
        class="arrow-right"
        name="arrow-right"
        fill="#1E1E1E"
        width="20"
        height="20"
      />
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
    // Call the action to toggle the state based on the button pressed
    changeState (todo, stateChange) {
      this.$store.dispatch('ToDos/setTodoStatus', [todo, stateChange])
      // if (this.todo.completed) {
      //   this.$store.dispatch('ToDos/setUndone', this.todo.id)
      // } else {
      //   this.$store.dispatch('ToDos/setDone', this.todo.id)
      // }
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

  button {
    border: none;
    border-radius: 50%;
    vertical-align: middle;
    padding: 1px;
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
