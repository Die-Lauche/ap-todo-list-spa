<template>
  <div id="App">
    <div id="nav row">
      <div id="logo">
        <img src="./assets/logo.png" />
      </div>
      <div class="logout-btn">
        <a v-if="authenticated" href="#" @click.prevent="logout">Logout</a>
      </div>
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
  },
  mounted () {
    // Add the flexboxgrid css via cdn into the head. https://github.com/kristoferjoseph/flexboxgrid
    const flexboxgridCss = document.createElement('link')
    flexboxgridCss.setAttribute('rel', 'stylesheet')
    flexboxgridCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css')
    flexboxgridCss.setAttribute('type', 'text/css')
    document.head.appendChild(flexboxgridCss)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap');
body {
  font-family: Lato;
  font-size: 16px;
  background-color: #ffffff;
}

#logo img {
  width: 120px;
  height: auto;
}

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

h1 {
  font-family: Lato;
  margin-bottom: 15px;
  font-size: 32px;
  font-weight: 900;
}

input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
