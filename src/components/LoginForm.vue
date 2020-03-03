<template>
  <div id="login">
    <div class="row">
      <div class="left-column col-lg-4 col-xs-12">
        <h1>Bring deine Projekte auf das nächste Level</h1>
      <div>
      <button type="button" class="btn" @click="showModal">
        Login
      </button>
      <modal-container v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          <h1>Login</h1>
        </template>
        <template v-slot:body>

        </template>
        <template v-slot:footer>

        </template>
      </modal-container>
      </div>
      <div>
      <button type="button" class="btn" @click="showModal">
        Registrieren
      </button>
      <modal-container v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          <h1>test</h1>
        </template>
        <template v-slot:body>

        </template>
        <template v-slot:footer>

        </template>
      </modal-container>
      </div>
      <form @submit.prevent="doLogin">
        <input type="text" name="username" v-model="username" placeholder="Benutzername" />
        <input type="password" name="password" v-model="password" placeholder="Passwort" />
        <button type="submit" class="btn">
          <span>Login</span>
        </button>
      </form>
      </div>
      <div class="right-column col-lg-8 col-xs-12">
        <img src="../assets/undraw_to_do_list_a49b.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalContainer from './ModalContainer.vue'

export default {
  data () {
    return {
      username: '',
      password: '',
      isModalVisible: false
    }
  },
  components: { ModalContainer },
  methods: {
    ...mapActions('Users', ['login']),
    async doLogin () {
      const result = await this.login({
        username: this.username,
        password: this.password
      })
      if (!result) {
        alert('Something went wrong')
      }
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<style>
/* #login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
} */

.right-column img {
  width: 100%;
  height: auto;
}
</style>
