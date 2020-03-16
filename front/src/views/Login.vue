<template>
  <v-row align="center" justify="center" class="full-screen">
    <v-col cols="12" sm="8" md="6" lg="6" class="text-center">
      <v-card class="login">
        <v-card-actions class="text-center">
          <v-btn disabled @click="signInWithGoogle()" color="lime">
            Login with
            <v-icon color="error">mdi-google</v-icon>
          </v-btn>
          <v-btn disabled color="lime">
            Login with
            <v-icon color="error">mdi-twitter</v-icon>
          </v-btn>
          <v-btn v-if="0" disabled color="lime">
            Login with
            <v-icon color="error">mdi-github</v-icon>
          </v-btn>
        </v-card-actions>
        <div class="text-center or-spacer">
          <div class="line"></div>
          <div>or</div>
          <div class="line"></div>
        </div>
        <v-card-text>
          <v-form @submit="signInWithEmailAndPassword()">
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
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn color="primary" @click="signInWithEmailAndPassword()">Login</v-btn>
        </v-card-actions>

        <div class="text-center or-spacer">
          <div class="line"></div>
          <div>or</div>
          <div class="line"></div>
        </div>

        <v-card-actions class="text-center">
          <v-btn to="register" color="red">Register for alpha 👨‍🔬🧪</v-btn>
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
      }
    }
  },
  methods: {
    signInWithGoogle() {
      this.$store.dispatch('signInWithGoogleAction');
    },
    signInWithEmailAndPassword()  {
      this.$store.dispatch('signInWithEmailAndPassword', this.user);
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
.full-screen {
  width: calc(100% + 24px);
  height: calc(100vh - 96px);
  overflow-y: auto;
  margin-top: -12px;
}

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
