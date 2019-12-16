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
    data() {
        return {
            
            teamInput: null
        }
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    methods: {
      joinTeam() {
        console.log('Join team id: ' + this.team.id)
        this.$store.dispatch('assignTeamAction', this.team.id);
      },
      leaveTeam() {
        this.$store.dispatch('assignTeamAction', null);
      }
    },
}
</script>

<style>
</style>
