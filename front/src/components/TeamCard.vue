<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{team.name}}</p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        Team description
        <a href="#">@bulmaio</a>.
        <a href="#">#css</a>
        <a href="#">#responsive</a>
        <br />
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <button
          class="button is-primary"
          @click="joinTeam()"
          :disabled="userMetadata.assignedTeam !== team.uid"
        >Join</button>
      </div>
      <div class="card-footer-item">
        <button
          class="button is-danger"
          @click="leaveTeam()"
          :disabled="userMetadata.assignedTeam === team.uid"
        >Leave</button>
      </div>
      <div class="card-footer-item">
        <router-link class="button is-info" :to="{ name: 'gifs', params: { teamId: team.uid}}">See GIFs</router-link>
      </div>
    </footer>
  </div>
</template>

<script>

 import firebase from 'firebase';

  const db = firebase.firestore();

export default {
    props: ['team'],
    data() {
        return {
            userMetadata: {},
            teamInput: null
        }
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    mounted() {
      db.collection('userMetadata')
      .doc(this.user.uid)
      .get()
      .then(snapshot => {
        this.userMetadata = snapshot.data();
      })
    },
    methods: {
      joinTeam() {  
        console.log(this.user.uid);      
        db.collection("usersMetadata").doc(this.user.uid).set({
          assignedTeamId: this.team.id
        }, { merge: true });
      },
      leaveTeam() {
        console.log(this.user.uid);
        db.collection("usersMetadata").doc(this.user.uid).update({
          assignedTeamId: firebase.firestore.FieldValue.delete()
        });
      }
    },
}
</script>

<style>
</style>
