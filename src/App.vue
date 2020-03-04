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
// Overall styling
$alternative-grey: #F2F2F2;
$grey: #E0E0E0;
$blue-primary: #3399FF;
$blue-light:  #EBF5FF;

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

h1, .h1 {
  font-family: Lato;
  margin-bottom: 15px;
  font-size: 32px;
  font-weight: 900;
}

input {
  width: 100%;
  padding: 12px 8px;
  margin-bottom: 10px;
  background-color: $alternative-grey;
  border-radius: 5px;
  border-style: none;
  box-sizing: border-box;

  &::placeholder {
    font-family: Lato;
    font-size: 16px;
    font-weight: 700;
  }

  &:focus {
    outline: none;
  }
}

button {
  font-family: Lato;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  padding: 10px;
  margin: 10px 0;
  border-radius: 30px;
  min-width: 180px;
  border: 2px solid $blue-primary;
  background-color: $blue-primary;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    color: $blue-primary;
    border: 2px solid $blue-primary;
    background-color: #fff;

    &.white {
      color: #fff;
      border: 2px solid $blue-primary;
      background-color: $blue-primary;
    }
  }

  // White background and blue font for the second button style
  &.white {
    color: $blue-primary;
    border: 2px solid $blue-primary;
    background-color: #fff;
  }
}

// Modal styles
.v--modal {
  padding: 20px!important;
  border-radius: 10px!important;

  h1, .h1 {
    text-align: center;
  }

  button[type="submit"] {
    margin: 15px auto 0px auto;
    display: block;
  }
}
</style>
