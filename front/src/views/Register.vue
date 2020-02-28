<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12" sm="8" md="6" lg="6" class="text-center">
      <v-card class="login">
        <v-card-text>
          <v-form @submit="createUserWithEmailAndPassword()">
            <v-text-field
              required
              label="Email"
              name="email"
              prepend-icon="mdi-account"
              type="email"
              v-model="user.email"
            />

            <v-text-field
              required
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="user.password"
            />

            <v-text-field
              required
              id="password"
              label="Password confirm"
              name="password2"
              prepend-icon="mdi-lock"
              type="password"
              v-model="user.password2"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn @click="createUserWithEmailAndPassword()" color="red">Register for beta 👨‍🔬🧪</v-btn>
        </v-card-actions>

        <div class="text-center or-spacer">
          <div class="line"></div>
          <div>or</div>
          <div class="line"></div>
        </div>

        <strong>You already have a account ?!</strong>
        <v-card-actions class="text-center">
          <v-btn to="login" color="primary">Login 📮</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      user: {
        "email": "",
        "password": "",
        "password2": "",
      }
    }
  },
  methods: {
    createUserWithEmailAndPassword() {
      if(this.user.email && this.user.password.length > 6 && this.user.password === this.user.password2){
        this.$store.dispatch('createUserWithEmailAndPassword', this.user);
      }
    }
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'setUser') {
        this.$router.push('/');
      }
    });
  }
};
</script>

<style lang="scss">
.login {
  padding: 20px 10px;
  width: 500px;
  max-width: 100%;
}

.full-height {
  height: calc(100vh - 132px);
}

.text-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.or-spacer {
  .line {
    background: white;
    width: 100%;
    height: 1px;
    margin: 40px 10px;
  }
}
</style>
