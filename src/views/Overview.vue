<template>
  <div id="overview">
    <div class="project-wrapper">
      <h1>Projekte</h1>
      <button class="project-new-btn btn" @click="show('newProject')">
        <unicon
          class="plus"
          name="plus"
          fill="#fff"
          width="20"
          height="20"
        />
        Hinzufügen
      </button>
      <div class="todo-lists row">
        <todo-list
          v-for="list in lists"
          :key="list.id"
          :list="list"
        />
      </div>

      <modal name="newProject" height="auto" width="400">
        <div class="h1">
          Neues Projekt anlegen
        </div>
        <form @submit.prevent="addNewProject">
          <input v-model="projectName" type="text" name="projectName" placeholder="Projekt Name eingeben...">
          <button type="submit" class="btn">
            <span>Erstellen</span>
          </button>
        </form>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from '../components/TodoList'

export default {
  components: { TodoList },
  computed: {
    ...mapGetters('ToDos', ['lists'])
  },
  methods: {
    // Add a new list to the user
    addNewList () {
      this.$store.dispatch('ToDos/createNewList', this.userId)
    },
    // Show the modal when clicked
    show (modalName) {
      this.$modal.show(modalName)
    }
  }
}
</script>

<style lang="scss" scoped>
// Scoped Styles only for this view
#overview {
  border-top: 1px solid #E0E0E0;
}

h1 {
  display: inline-block;
}

.project-wrapper {
  max-width: 950px;
  margin: 0 auto;
}

.project-new-btn {
  &:hover {
    .plus{
      fill: #3399FF;
    }
  }
}
</style>
