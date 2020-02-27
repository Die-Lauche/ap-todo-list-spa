<template>
  <div id="App">
    <!-- <router-view></router-view> -->
    <div id="nav">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters('Users', ['authenticated'])
  },
  mounted () {
    // Send the user to the login page if hes not authenticated
    if (!this.authenticated) {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
    logout () {
      sessionStorage.removeItem('user')
      this.authenticated = false
      this.$router.replace({ name: 'login' })
      // @todo Clear the store
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
