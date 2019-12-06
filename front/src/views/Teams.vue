<template>
  <div class="teams">
    <h1>This is the list of the teams</h1>
    {{ JSON.stringify(teams) }}
  </div>
</template>

<script>

  import firebase from "firebase";

  const db = firebase
  .initializeApp(require('../firebaseConfig.json'))
  .firestore();

  export default {
      name: "teams",
      firestore: {
          fireTeams: db.collection('teams')
      },
      data() {
          return {name: "test"};
      },
      created() {
          this.getTeams();
      },
      computed: {
          teams() {
              return this.fireTeams;
          }
      },
      methods: {
          getTeams() {
              console.log("Attempt to get teams: " + this.name);
              console.log(this.teams);
          }
      }
  }
</script>
