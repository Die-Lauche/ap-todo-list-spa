<template>
  <div class="todo-item">
    <div class="row middle-xs">
      <div v-if="!todo.isInTodo" class="col-xs-2">
        <button class="moveToTodo" @click="changeState(todo, 'left')">
          <unicon
            class="arrow-left"
            name="arrow-left"
            fill="#1E1E1E"
            width="20"
            height="20"
          />
        </button>
      </div>
      <div :class="centerCol">
        <span :class="itemClass">{{ todo.content }}</span>
      </div>
      <div class="col-xs-2">
        <button class="trash" @click="deleteTodo(todo)">
          <unicon
            class="trash-alt"
            name="trash-alt"
            fill="#fff"
            width="20"
            height="20"
          />
        </button>
      </div>
      <div v-if="!todo.isCompleted" class="col-xs-2 end-xs">
        <button class="moveToInProgress" @click="changeState(todo, 'right')">
          <unicon
            class="arrow-right"
            name="arrow-right"
            fill="#1E1E1E"
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
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
      return this.todo.isCompleted ? 'complete' : ''
    },
    centerCol () {
      return (this.todo.isInTodo || this.todo.isCompleted) ? 'col-xs-8' : 'col-xs-6'
    }
  },
  methods: {
    // Call the action to toggle the state based on the button pressed
    changeState (todo, direction) {
      this.$store.dispatch('ToDos/checkAndMoveToDo', [todo, direction])
    },
    deleteTodo (todo) {
      this.$store.dispatch('ToDos/deleteTodo', todo)
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
  margin: 10px 0;

  &:hover {
    .trash{
      opacity: 1;
    }
  }

  button {
    border: none;
    border-radius: 50px;
    vertical-align: middle;
    padding: 2px;
    cursor: pointer;
    width: 25px;
    height: 25px;

    .unicon {
      display: flex;
    }

    &:focus {
      outline: none;
    }
  }

}

span {
  word-break: break-word;
}

.trash {
  background: #FF3366;
  opacity: 0;
  transition: opacity .1s ease-in;
}
</style>
