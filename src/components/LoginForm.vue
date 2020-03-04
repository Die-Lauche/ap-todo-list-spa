<template>
  <div id="login">
    <div id="blue-ball"></div>
    <div class="row">
      <div class="col-lg-4 col-xs-12">
        <div class="left-column">
        <h1>Bring deine Projekte auf das nächste Level</h1>
        <div class="login-container">
          <button type="button" @click="show('login')">
            <span>Login</span>
          </button>
          <modal name="login" height="auto" width="300">
            <div class="h1">Login</div>
            <form @submit.prevent="doLogin">
              <input type="text" name="username" v-model="username" placeholder="Benutzername" />
              <input type="password" name="password" v-model="password" placeholder="Passwort" />
              <button type="submit">
                <span>Anmelden</span>
              </button>
            </form>
          </modal>
        </div>
        <div class="registration-container">
          <button type="button" class="white" @click="show('registration')">
          <span>Registrieren</span>
          </button>
          <modal name="registration" height="auto" width="300">
            <div class="h1">Registrieren</div>
            <form @submit.prevent="doRegistration">
              <input type="text" name="usernameReg" v-model="usernameReg" placeholder="Benutzername" />
              <input type="password" name="passwordReg" v-model="passwordReg" placeholder="Passwort" />
              <input type="text" name="email" v-model="email" placeholder="E-Mail" />
              <input type="text" name="city" v-model="city" placeholder="Stadt" />
              <input type="text" name="postCode" v-model="postCode" placeholder="Postleitzahl" />
              <button type="submit">
                <span>Registrieren</span>
              </button>
            </form>
          </modal>
        </div>
      </div>

      </div>
      <div class="col-lg-8 col-xs-12">
        <div class="right-column">
          <img src="../assets/undraw_to_do_list_a49b.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      isModalVisible: false
    }
  },
  methods: {
    ...mapActions('Users', ['login', 'registration']),
    async doLogin () {
      const result = await this.login({
        username: this.username,
        password: this.password
      })
      if (!result) {
        alert('Something went wrong')
      }
    },
    async doRegistration () {
      const result = await this.registration({
        username: this.usernameReg,
        password: this.passwordReg,
        email: this.email,
        city: this.city,
        postCode: this.postCode
      })
      if (!result) {
        alert('Something went wrong')
      }
    },
    show (modalName) {
      this.$modal.show(modalName)
    }
  }
}
</script>

<style lang="scss">
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
  max-width: 950px;
  margin-top: 50px;
}

.left-column {
  padding: 10%;
}
</style>
