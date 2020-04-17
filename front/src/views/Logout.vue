<template>
  <div>{{user}}</div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('signOutAction');

        this.$router.push('/login');
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
}
</script>

<style scoped>
</style>
