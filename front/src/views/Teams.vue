<template>
  <section class="teams">
    <div class="container">
      <h1 class="title">Teams</h1>
      <h2 class="subtitle">
        This is the list of
        <strong>YourOrganization</strong> teams
      </h2>
      <div class="list" v-if="!user">
        <h2 class="subtitle has-text-danger">You do not have access to this page !</h2>
      </div>
      <div class="list" v-if="user">
        <god-cardteam
          class="item"
          v-for="(team, index) in teams"
          :key="`team-${index}`"
          :team="team"
        ></god-cardteam>
      </div>
    </div>
  </section>
</template>

<script>

  import firebase from 'firebase';
  import TeamCard from '@/components/TeamCard';

  const db = firebase.firestore();

  export default {
		name: "teams",
		components: {
		'god-cardteam': TeamCard,
		},
    firestore: {
        teams: db.collection('teams')
    },
    data() {
        return {teams:[]};
    },
    created() {
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
}
.list {
  padding: 10%;

  .item {
    margin-bottom: 20px;
  }
}
</style>
