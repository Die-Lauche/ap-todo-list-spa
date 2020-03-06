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
        <div class="lane lane-todo col-lg-4 col-xs-12">
          <div class="lane-headline">
            To Do
          </div>
          <div class="row">
            <todo-item
              v-for="todo in todosTodo"
              :key="todo.id"
              :todo="todo"
            />
          </div>
          <div class="add-new-wrapper">
            <input type="text" placeholder="Neue Aufgabe...">
          </div>
        </div>
        <div class="lane lane-progress col-lg-4 col-xs-12">
          <div class="lane-headline">
            In Arbeit
          </div>
          <div class="row">
            <todo-item v-for="todo in todosProgressing" :key="todo.id" :todo="todo" />
          </div>
        </div>
        <div class="lane lane-completed col-lg-4 col-xs-12">
          <div class="lane-headline">
            Erledigt
          </div>
          <div class="row">
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
    display: inline-block;
    vertical-align: top;
    padding: 12px;
    background-color: #F3F5F6;
    border-radius: 8px;
  }

  .lane-completed {
    .todo-item {
      background: #19af2c;
      color: #fff;
    }
  }
}

.add-new-wrapper input {
  margin-top: 10px;
  margin-bottom: 0;
  background: #3399FF;
  color: #fff;
  padding: 14px 12px;
  font-weight: 400;

    &::placeholder {
      color: #fff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      font-weight: 400;
  }
}

</style>
