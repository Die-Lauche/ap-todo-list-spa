<template>
  <div class="col-lg-4">
    <div class="list-wrapper">
      <router-link :to="{ name: 'details', params: { listId: list.id }}"
                   class="project-link middle-xs" @click.stop
      >
        <div class="todo-list">
          <div class="row">
            <div class="col-xs-10">
              <div class="h1 list-title">
                {{ list.title }}
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <button class="trash" @click="deleteList(list)">
        <unicon
          class="trash-alt"
          name="trash-alt"
          fill="#fff"
          width="20"
          height="20"
        />
      </button>
    </div>
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
  methods: {
    deleteList (event, list) {
      this.$store.dispatch('ToDos/deleteList', this.list)
    }
  }
}
</script>

<style lang="scss" scoped>

.list-wrapper {
  position: relative;
  margin-bottom: 16px;

  &:hover {
    .trash{
      opacity: 1;
    }
  }
}

.project-link {
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.todo-list {
  display: flex;
  padding: 16px 65px 16px 16px;

  .list-title {
    color: #1E1E1E;
    font-size: 16px;
    margin-bottom: 0;
    text-decoration: none;
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

.trash {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  background: #FF3366;
  opacity: 0;
  transition: opacity .1s ease-in;
}

.row {
  width: 100%;
}

a {
  text-decoration: none;
}
</style>
