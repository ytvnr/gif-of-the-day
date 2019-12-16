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
        <a
          href="#"
        >@bulmaio</a>.
        <a href="#">#css</a>
        <a href="#">#responsive</a>
        <br />
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
    <footer class="card-footer">
<!--      <button class="link card-footer-item icon" @click="joinTeam" :disabled="user && user.assignedTeam">-->
<!--        <i class=""></i>-->
<!--        <span>Join</span>-->
<!--      </button>-->
      <div class="card-footer-item">
        <button class="button is-primary" @click="joinTeam" :disabled="user.assignedTeam">Join</button>
      </div>
      <div class="card-footer-item">
        <button class="button is-danger">Leave</button>
      </div>
      <div class="card-footer-item">
        <button class="button is-info">See GIFs</button>
      </div>

    </footer>
  </div>
</template>

<script>

export default {
    props: ['team'],
    methods: {
      joinTeam() {
        console.log('Join team id: ' + this.team.id)
        this.user.assignedTeam = this.team.id;
        this.$userService.updateUser(this.user);
        // firebase.auth().updateCurrentUser(this.user);
      },
      leaveTeam() {
        this.user.assignedTeam = null;
        this.$userService.updateUser(this.user);
        // firebase.auth().updateCurrentUser(this.user);
      }
    },
    data() {
        return {
            user: null,
            teamInput: null
        }
    },
    created() {
      this.user = this.$userService.getCurrentUser();
      // firebase.auth().onAuthStateChanged(user => {
      //   console.log('Created ' + user);
      //   this.user = user;
      // });
    }
}
</script>

<style>
</style>
