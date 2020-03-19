<template>
  <div id="detail-overview">
    <div class="wrapper">
      <router-link :to="'/'">
        <unicon
          class="arrow-left"
          name="arrow-left"
          fill="#1E1E1E"
          width="30"
          height="30"
        />
      </router-link>
      <h1>{{ currentList.title }}</h1>
      <div class="lane-wrapper row">
        <div class="col-lg-4 col-xs-12">
          <div class="lane lane-todo">
            <div class="lane-headline">
              To Do
            </div>
            <todo-item
              v-for="todo in todosTodo"
              :key="todo.id"
              :todo="todo"
            />
            <div class="add-new-wrapper">
              <input v-model="newTodo" type="text" placeholder="Neue Aufgabe..." @keyup.enter="addTodo()">
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-xs-12">
          <div class="lane lane-progress">
            <div class="lane-headline">
              In Arbeit
            </div>
            <todo-item v-for="todo in todosProgressing" :key="todo.id" :todo="todo" />
          </div>
        </div>
        <div class="col-lg-4 col-xs-12">
          <div class="lane lane-completed">
            <div class="lane-headline">
              Erledigt
            </div>
            <todo-item
              v-for="todo in todosCompleted" :key="todo.id"
              :todo="todo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoItem from '../components/TodoItem'

export default {
  components: { TodoItem },
  data () {
    return {
      newTodo: ''
    }
  },
  computed: {
    ...mapGetters('ToDos', [
      'todos',
      'currentList',
      'todosCompleted',
      'todosTodo',
      'todosProgressing'
    ])
  },
  created () {
    console.log(this.$route.params.listId)
    this.$store.dispatch('ToDos/setCurrentList', this.$route.params.listId)
    this.$store.dispatch('ToDos/getListTodos', this.$route.params.listId)
  },
  methods: {
    addTodo () {
      this.$store.dispatch('ToDos/addTodo', this.newTodo)
      this.newTodo = ''
    }
  }
}
</script>

<style lang="scss" scoped>
// Scoped Styles only for this view
#detail-overview {
  border-top: 1px solid #E0E0E0;
}

h1, .h1 {
  display: inline-block;
}

.arrow-left {
  vertical-align: sub;
  margin-right: 16px;

  svg {
    &:hover {
      fill: #3399FF;
    }
  }

}

.wrapper {
  max-width: 950px;
  margin: 0 auto;
}

.lane-headline {
  color: #ABBCC9;
  font-weight: 700;
  margin-bottom: 10px;
}

.lane-wrapper {

  .lane {
    position: relative;
    display: block;
    padding: 12px;
    background-color: #F3F5F6;
    border-radius: 8px;
    min-height: 650px;
    max-height: 600px;
    overflow: hidden;
    overflow-y: auto;
  }

  .lane-completed {
    .todo-item {
      background: #19af2c;
      color: #fff;
    }
  }
}

.add-new-wrapper {
  position: sticky;
  bottom: 0;
  padding: 14px 12px;
  background: #3399FF;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

    input {
      margin-bottom: 0;
      color: #fff;
      font-weight: 400;
      padding: 0;
      padding-bottom: 5px;
      background: #3399FF;
      border-radius: 0;
      border-bottom: 1px solid #ffffff52;

      transition: border-bottom .1s ease-in;

      &:hover, &:focus {
        border-bottom: 1px solid #fff;
      }

      &::placeholder {
        color: #fff;
        font-weight: 400;
     }
  }

}

</style>
