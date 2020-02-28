<template>
  <div id="App">
    <div id="nav">
      <a v-if="authenticated" href="#" @click.prevent="logout">Logout</a>
    </div>
    <router-view v-if="authenticated" />
    <login-form v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginForm from './components/LoginForm'

export default {
  name: 'App',
  components: { LoginForm },
  computed: {
    ...mapGetters('Users', ['authenticated'])
  },
  methods: {
    logout () {
      // Set the user to null so authenticated = false
      // Should possibly be done while clearing the store.
      this.$store.dispatch('Users/logout')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
