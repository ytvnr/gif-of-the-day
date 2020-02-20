<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12" sm="8" md="4" class="text-center">
      <v-btn @click="signInWithGoogle()" color="lime">Login</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    signInWithGoogle() {
      this.$store.dispatch('signInWithGoogleAction');
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

<style>
.full-height {
  height: calc(100vh - 132px);
}
</style>
