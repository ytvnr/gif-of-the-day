<template>
  <div>{{user}}</div>
</template>

<script>
export default {
    beforeCreate() {
      this.$store.dispatch('signOutAction');
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
}
</script>

<style>
</style>
