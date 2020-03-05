<template>
  <div id="login">
    <div id="blue-ball"></div>
    <div class="row">
      <div class="col-lg-5 col-xs-12">
        <div class="left-column">
        <h1>Bring deine Projekte auf das nächste Level</h1>
        <div class="login-container">
          <button class="btn btn--large" type="button" @click="show('login')">
            <span>Login</span>
          </button>
          <modal name="login" height="auto" width="300">
            <div class="h1">Login</div>
            <form @submit.prevent="doLogin">
              <input type="text" name="username" v-model="username" placeholder="Benutzername" />
              <input type="password" name="password" v-model="password" placeholder="Passwort" />
              <button type="submit" class="btn">
                <span>Anmelden</span>
              </button>
            </form>
          </modal>
        </div>
        <div class="registration-container">
          <button type="button" class="btn btn--large white" @click="show('registration')">
          <span>Registrieren</span>
          </button>
          <modal name="registration" height="auto" width="300">
            <div class="h1">Registrieren</div>
            <form @submit.prevent="doRegistration">
              <input type="text" name="usernameReg" v-model="usernameReg" placeholder="Benutzername" />
              <input type="password" name="passwordReg" v-model="passwordReg" placeholder="Passwort" />
              <input type="email" name="email" v-model="email" placeholder="E-Mail" />
              <input type="text" name="city" v-model="city" placeholder="Stadt" />
              <input type="number" name="postCode" v-model="postCode" placeholder="Postleitzahl" />
              <button type="submit" class="btn">
                <span>Registrieren</span>
              </button>
            </form>
          </modal>
        </div>
      </div>
      </div>
      <div class="col-lg-7 col-xs-12 end-xs">
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
      usernameReg: '',
      passwordReg: '',
      email: '',
      city: '',
      postCode: '',
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

<style lang="scss" scoped>
#login {
  max-width: 1435px;
  margin: 0 auto;
  margin-top: 64px;
}

.right-column img {
  width: 100%;
  height: auto;
  max-width: 950px;
  margin-top: 50px;
}

.left-column {
  padding: 10%;
  position: relative;
  z-index: 20;
}

.login-container, .registration-container {
  h1, .h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }
}

#blue-ball {
  position: absolute;
  top: -70px;
  left: -190px;
  width: 550px;
  height: 550px;
  background-color:#EBF5FF;
  border-radius: 50%;
  z-index: 1;
}

h1, .h1 {
  font-size: 64px;
  margin-bottom: 64px;
  font-weight: 900;
}
</style>
