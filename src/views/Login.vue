<template>
  <div id="login">
    <div class="header row">
      <img src="../assets/logo.png" />
    </div>
    <div class="row">
      <div class="left-column col-lg-4">
        <h1>ToDo-List Login</h1>
        <form @submit.prevent="doLogin">
          <input type="text" name="username" v-model="username" placeholder="Benutzername" />
          <input type="password" name="password" v-model="password" placeholder="Passwort" />
          <button type="submit" class="btn">
            <span>Login</span>
          </button>
        </form>
      </div>
      <div class="right-column col-lg-8">
        <img src="../assets/undraw_to_do_list_a49b.svg" />
      </div>
    <div>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('Users', ['login']),
    async doLogin () {
      const result = await this.login({
        username: this.username,
        password: this.password
      })
      if (result) {
        this.$router.replace({ name: 'overview' })
      } else {
        alert('Something went wrong')
      }
    }
  }
}
</script>

<style>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}

h1 {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.btn {
  position: relative;

  display: block;
  padding: 0;

  overflow: hidden;

  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);

  background-color: #57595d;
  color: #ecf0f1;

  transition: background-color 0.3s;
}

.btn:hover,
.btn:focus {
  background-color: #393b3f;
  cursor: pointer;
}

.btn > * {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.btn:before {
  content: "";

  display: block;
  width: 0;
  padding-top: 0;

  border-radius: 100%;

  background-color: rgba(236, 240, 241, 0.3);

  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.btn:active:before {
  transition: width 0.2s ease-out, padding-top 0.2s ease-out;
}
</style>
